import { Redis } from 'ioredis';
import { config } from 'dotenv';
import { log } from './log';

config();

const redis = new Redis(process.env.REDIS_URL as string);

redis.on('connect', () => {
    log.info('Connected to Redis instance');
});

redis.on('error', (error) => {
    log.error(error);
    process.exit(1);
});

export { redis };
