import { generateRandomData, saveDataToFile } from './random-data.js';
import { mysqlHandler } from './mysql.js';
import { redisHandler } from './redis.js';

const testPerformance = async () => {
    const { students, tutors, feedback } = generateRandomData(1000);
    saveDataToFile({ students, tutors, feedback }, 'feedbackData.json');

    //mysql operations
    console.log('Starting MySQL operations...');
    await mysqlHandler.clearData();
    await mysqlHandler.insertData('student', students);
    await mysqlHandler.insertData('tutor', tutors);
    await mysqlHandler.insertData('feedback', feedback);
    const mysqlFetchTime = await mysqlHandler.fetchAllData();

    //redis operations
    console.log('Starting Redis operations...');
    await redisHandler.connect();
    await redisHandler.insertData(feedback);
    const redisFetchTime = await redisHandler.fetchAllData();
    await redisHandler.disconnect();

    //compare and print results
    console.log('\nPerformance Comparison:');
    console.log(`MySQL fetch time: ${mysqlFetchTime} ms`);
    console.log(`Redis fetch time: ${redisFetchTime} ms`);

    if (mysqlFetchTime < redisFetchTime) {
        console.log('MySQL is faster for fetching data.');
    } else {
        console.log('Redis is faster for fetching data.');
    }
};

testPerformance().catch(console.error);
