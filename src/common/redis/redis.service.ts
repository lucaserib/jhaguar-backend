import { Injectable, Logger } from '@nestjs/common';
import Redis, { Redis as RedisClient } from 'ioredis';

@Injectable()
export class CommonRedisService {
  private readonly logger = new Logger(CommonRedisService.name);
  private client: RedisClient | null = null;

  constructor() {
    const host = process.env.REDIS_HOST || process.env.REDIS_URL?.split('://')[1]?.split(':')[0] || 'redis';
    const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;
    const password = process.env.REDIS_PASSWORD || undefined;

    try {
      this.client = new Redis({ host, port, password, lazyConnect: true });
      this.client.on('connect', () => this.logger.log('Redis conectado'));
      this.client.on('error', (err) =>
        this.logger.error(`Erro Redis: ${err.message}`),
      );
    } catch (err: any) {
      this.logger.error(`Falha ao inicializar Redis: ${err.message}`);
      this.client = null;
    }
  }

  getClient(): RedisClient | null {
    return this.client;
  }

  async get(key: string): Promise<string | null> {
    if (!this.client) return null;
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await (this.client as any).connect?.();
    return this.client.get(key);
  }

  async setPX(key: string, value: string, ttlMs: number): Promise<'OK' | null> {
    if (!this.client) return null;
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await (this.client as any).connect?.();
    return (this.client.set as any)(key, value, 'PX', ttlMs);
  }

  async del(key: string): Promise<number> {
    if (!this.client) return 0;
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await (this.client as any).connect?.();
    return this.client.del(key);
  }
}


