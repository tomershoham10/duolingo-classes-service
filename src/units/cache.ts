import redis from '../redisClient.js';

export const getFromCache = async (key: string): Promise<string | null> => {
    return await redis.get(key);
};

export const setToCache = async (key: string, value: string, expireTime: number = 3600): Promise<void> => {
    await redis.set(key, value, 'EX', expireTime); // Default expire time is 1 hour
};
