/////////////// OPTIONS ///////////////

enum OTypes {
    VESSEL = "vessel",
    COUNTRY = "country",
    SONAR = "sonar",
}

interface OptionType {
    name: string;
    type: Types;
}

/////////////// FSA ///////////////////

enum DifficultyLevel {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard",
}

interface FSAType {
    filesKeys: string[];
    difficultyLevel: DifficultyLevel;
    options: string[];
    answers: string[]; //my be 2 correct answers
    firstTimeBuffer: number; //in minutes
    secondTimeBuffer: number; //in minutes
    description: string;
}

/////////////// OPTIONS ///////////////

enum TypesOfLessons {
    searider = "SEARIDER",
    crew = "CREW",
    senior = "SENIOR"
}


/////////////// LESSONS ///////////////

interface LessonsType {
    name: string;
    exercises: string[];
    type: TypesOfLessons;
}

/////////////// SECTIONS ///////////////

interface SectionsType {
    name: string;
    lessons: string[];
}