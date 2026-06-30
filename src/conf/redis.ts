import { createClient } from "redis";

const globalForRedis = globalThis as unknown as {
  redisClient?: ReturnType<typeof createClient>;
};

export const redisClient =
  globalForRedis.redisClient ??
  createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      // tls: true,
      reconnectStrategy: (retries) => {
        if (retries > 10) return new Error("Redis reconnect failed");
        return Math.min(retries * 100, 3000);
      },
    },
  });

if (!globalForRedis.redisClient) {
  globalForRedis.redisClient = redisClient;
}

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  return redisClient;
}