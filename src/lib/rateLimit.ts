import { redisClient } from "@/conf/redis";

export async function rateLimit(key: string, limit: number, window: number) {

    const current = await redisClient.incr(key)

    if (current === 1) {
        await redisClient.expire(key, window)
    }

    const ttl = await redisClient.ttl(key);

    if (current > limit) {
        return {
            success: false,
            message: "Too many requests. Please try again later.",
            retryAfter: ttl,
        };
    }

    return { success: true };
}