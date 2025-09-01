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

  purgeExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (entry.expiresAt <= now) this.store.delete(key);
    }
  }
}
