import { Redis } from 'ioredis';

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10);

const redis = new Redis({
    host: redisHost,
    port: redisPort
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err: Error) => {
    console.error('Redis error', err);
});

export default redis;
