import { faker } from '@faker-js/faker';

async function generateAndSaveData() {
    try {
            const newFSA = ({
                filesKeys: [],
                difficultyLevel: faker.helpers.arrayElement(['Easy', 'Medium', 'Hard']) as DifficultyLevel,
                relevant: [],
                answers: [],
                firstTimeBuffer: faker.number.int(10),
                secondTimeBuffer: faker.number.int(10),
                description: faker.lorem.paragraphs(3)
            });
            console.log("fsa faker:", newFSA);
        

    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

generateAndSaveData();
