import { createClient } from 'redis';

const redisClient = createClient();

export const redisHandler = {
    connect: async () => {
        await redisClient.connect();
        console.log('Redis: Connected.');
    },

    disconnect: async () => {
        await redisClient.quit();
        console.log('Redis: Disconnected.');
    },

    insertData: async (data) => {
        for (const record of data) {
            await redisClient.hSet(`feedback:${record.id}`, record);
        }
        console.log('Redis: Data inserted.');
    },

    fetchAllData: async () => {
        const start = Date.now();
        for (let i = 1; i <= 10000; i++) {
            await redisClient.hGetAll(`feedback:${i}`);
        }
        const end = Date.now();
        console.log(`Redis: Fetched 10,000 records in ${end - start} ms`);
        return end - start;
    },
};
