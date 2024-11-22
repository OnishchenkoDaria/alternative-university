import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    database: 'university_new',
};

export const mysqlHandler = {
    clearData: async () => {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM feedback');
        await connection.execute('DELETE FROM student');
        await connection.execute('DELETE FROM tutor');
        console.log('MySQL: Previous data cleared.');
        await connection.end();
    },

    insertData: async (table, data) => {
        const connection = await mysql.createConnection(dbConfig);
        try {
            for (const record of data) {
                if (table === 'student') {
                    await connection.execute(
                        `INSERT INTO student (id, name, email, gender, isActive, lastModified, whoModified, AcademicAchievements, previousGrades) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        Object.values(record)
                    );
                } else if (table === 'tutor') {
                    await connection.execute(
                        `INSERT INTO tutor (id, name, email, gender, isActive, lastModified, whoModified, hireDate) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                        Object.values(record)
                    );
                } else if (table === 'feedback') {
                    await connection.execute(
                        `INSERT INTO feedback (id, score, student_id, tutor_id, comment, datePosted, lastModified, whoModified) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                        Object.values(record)
                    );
                }
            }
            console.log(`MySQL: Data inserted into ${table}`);
        } catch (error) {
            console.error(`Error inserting into ${table}:`, error);
        } finally {
            await connection.end();
        }
    },

    fetchAllData: async () => {
        const connection = await mysql.createConnection(dbConfig);
        const start = Date.now();
        const [rows] = await connection.execute('SELECT * FROM feedback');
        const end = Date.now();
        console.log(`MySQL: Fetched ${rows.length} records in ${end - start} ms`);
        await connection.end();
        return end - start;
    },
};
