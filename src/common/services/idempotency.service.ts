import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

interface StoredEntry<T> {
  value: T;
  expiresAt: number;
}

@Injectable()
export class IdempotencyService {
  private readonly logger = new Logger(IdempotencyService.name);
  private store = new Map<string, StoredEntry<any>>();
  constructor(private readonly redisService: RedisService) {}

  async getOrSet<T>(
    key: string,
    ttlMs: number,
    factory: () => Promise<T>,
  ): Promise<T> {
    const namespacedKey = `idem:${key}`;

    // Preferir Redis se disponível
    try {
      const cached = await this.redisService.get(namespacedKey);
      if (cached) {
        this.logger.debug(`Idempotency (redis) hit for key=${namespacedKey}`);
        return JSON.parse(cached) as T;
      }

      const value = await factory();
      await this.redisService.setPX(
        namespacedKey,
        JSON.stringify(value),
        ttlMs,
      );
      return value;
    } catch (err: any) {
      this.logger.error(
        `Redis indisponível para idempotência: ${err.message}. Fallback memória.`,
      );
      // fallback para memória abaixo
    }

    // Fallback em memória (não distribuído)
    const now = Date.now();
    const existing = this.store.get(namespacedKey);
    if (existing && existing.expiresAt > now) {
      this.logger.debug(`Idempotency (mem) hit for key=${namespacedKey}`);
      return existing.value as T;
    }

    const value = await factory();
    this.store.set(namespacedKey, { value, expiresAt: now + ttlMs });
    return value;
  }

  async delete(key: string): Promise<void> {
    const namespacedKey = `idem:${key}`;

    // Tentar deletar do Redis primeiro
    try {
      await this.redisService.del(namespacedKey);
      this.logger.debug(`Deleted idempotency key from Redis: ${namespacedKey}`);
    } catch (err: any) {
      this.logger.warn(`Failed to delete from Redis: ${err.message}`);
    }

    // Também deletar da memória local como fallback
    this.store.delete(namespacedKey);
  }

  async deleteByPattern(pattern: string): Promise<number> {
    const namespacedPattern = `idem:${pattern}`;
    let deletedCount = 0;

    // Tentar deletar do Redis primeiro
    try {
      deletedCount = await this.redisService.deleteByPattern(namespacedPattern);
      this.logger.debug(
        `Deleted ${deletedCount} idempotency keys from Redis matching pattern: ${namespacedPattern}`,
      );
    } catch (err: any) {
      this.logger.warn(`Failed to delete pattern from Redis: ${err.message}`);
    }

    // Também limpar da memória local (padrão simples)
    for (const [key] of this.store.entries()) {
      if (key.startsWith('idem:') && key.includes(pattern.replace('*', ''))) {
        this.store.delete(key);
        deletedCount++;
      }
    }

    return deletedCount;
  }

  purgeExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.expiresAt <= now) this.store.delete(key);
    }
  }
}
