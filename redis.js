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

        //using pipeline instead of `hGetAll` command
        const pipeline = redisClient.multi();
        for (let i = 1; i <= 1000; i++) {
            pipeline.hGetAll(`feedback:${i}`);
        }

        const results = await pipeline.exec(); //executes all commands in one go
        const end = Date.now();

        console.log(`Redis: Fetched ${results.length} records in ${end - start} ms`);
        return end - start;
    },
};
