import { faker } from '@faker-js/faker';
async function generateAndSaveData() {
    try {
        const newFSA = ({
            id: faker.string.uuid(),
            filesKeys: [],
            difficultyLevel: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']),
            options: [],
            answers: [],
            firstTimeBuffer: faker.number.int(10),
            secondTimeBuffer: faker.number.int(10),
            description: faker.lorem.paragraphs(3)
        });
        console.log("fsa faker:", newFSA);
        console.log('Data insertion completed.');
    }
    catch (error) {
        console.error('Error inserting data:', error);
    }
}
generateAndSaveData();
//# sourceMappingURL=FSA.js.map