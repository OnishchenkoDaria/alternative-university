import fs from 'fs';

export const generateRandomData = (numRecords) => {
    const students = [];
    const tutors = [];
    const feedback = [];

    for (let i = 1; i <= 1000; i++) {
        students.push({
            id: i,
            name: `Student ${i}`,
            email: `student${i}@example.com`,
            gender: i % 2 === 0 ? 'M' : 'F',
            isActive: true,
            lastModified: new Date().toISOString(),
            whoModified: 'system',
            AcademicAchievements: Math.floor(Math.random() * 100),
            previousGrades: Math.floor(Math.random() * 100),
        });

        tutors.push({
            id: i,
            name: `Tutor ${i}`,
            email: `tutor${i}@example.com`,
            gender: i % 2 === 0 ? 'M' : 'F',
            isActive: true,
            lastModified: new Date().toISOString(),
            whoModified: 'system',
            hireDate: new Date().toISOString(),
        });
    }

    for (let i = 1; i <= numRecords; i++) {
        feedback.push({
            id: i,
            score: Math.floor(Math.random() * 100),
            student_id: Math.floor(Math.random() * 1000) + 1,
            tutor_id: Math.floor(Math.random() * 1000) + 1,
            comment: `Comment number ${i}`,
            datePosted: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            whoModified: 'system',
        });
    }

    return { students, tutors, feedback };
};

export const saveDataToFile = (data, filename) => {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filename}`);
};
