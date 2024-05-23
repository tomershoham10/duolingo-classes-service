import redis from '../redisClient.js';

export const getFromCache = async (namespace: string, key: string): Promise<string | null> => {
    return await redis.get(`${namespace}:${key}`);
};

export const setToCache = async (namespace: string, key: string, value: string, expireTime: number = 3600): Promise<void> => {
    await redis.set(`${namespace}:${key}`, value, 'EX', expireTime); // Default expire time is 1 hour
};

export const resetNamespaceCache = async (namespace: string, key: string): Promise<void> => {
    await redis.del(`${namespace}:${key}`);
};