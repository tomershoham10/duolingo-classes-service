/////////////// COURSES //////////////////

enum TypesOfCourses {
    searider = "searider",
    crew = "crew",
    senior = "senior"
}

interface CoursesType {
    id: string;
    type: TypesOfCourses;
    units: string[];
}

/////////////// UNITS //////////////////

interface UnitsType {
    id: string;
    sections: string[];
    guidebook: string;
}

/////////////// SECTIONS ///////////////

interface SectionsType {
    id: string;
    lessons: string[];
}

/////////////// LESSONS ///////////////

enum TypesOfLessons {
    searider = "SEARIDER",
    crew = "CREW",
    senior = "SENIOR"
}

interface LessonsType {
    id: string;
    name: string;
    exercises: string[];
    type: TypesOfLessons;
}

/////////////// FSA ///////////////////

enum DifficultyLevel {
    Easy = "Easy",
    Medium = "Medium",
    Hard = "Hard",
}

interface FSAType {
    id: string;
    filesKeys: string[];
    difficultyLevel: DifficultyLevel;
    options: string[];
    answers: string[]; //my be 2 correct answers
    firstTimeBuffer: number; //in minutes
    secondTimeBuffer: number; //in minutes
    description: string;
    dateCreated: Date;
}

/////////////// OPTIONS ///////////////

enum TypesOfOptions {
    VESSEL = "vessel",
    COUNTRY = "country",
    SONAR = "sonar",
}

interface OptionType {
    id: string;
    name: string;
    type: Types;
}