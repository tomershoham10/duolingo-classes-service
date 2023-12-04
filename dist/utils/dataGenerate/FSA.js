import { faker } from '@faker-js/faker';
async function generateAndSaveData() {
    try {
        const newFSA = {
            filesKeys: [],
            difficultyLevel: faker.number.int(10),
            relevant: [],
            answers: [],
            timeBuffers: Array.from({ length: 2 }, () => ({
                timeBuffer: faker.number.int(100),
                grade: faker.number.int(10),
            })),
            description: faker.lorem.paragraphs(3),
        };
        console.log("fsa faker:", newFSA);
    }
    catch (error) {
        console.error('Error inserting data:', error);
    }
}
generateAndSaveData();
//# sourceMappingURL=FSA.js.map