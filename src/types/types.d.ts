/////////////// COURSES //////////////////

enum TypesOfCourses {
    SEARIDER = "searider",
    CREW = "crew",
    SENIOR = "senior"
}

interface CoursesType {
    _id: string;
    type: TypesOfCourses;
    units: string[];
}

/////////////// UNITS //////////////////

interface UnitsType {
    _id: string;
    levels?: string[];
    guidebook?: string;
    description?: string;
}

/////////////// LEVELS ///////////////

interface LevelsType {
    _id: string;
    lessons: string[];
}

/////////////// LESSONS ///////////////

enum TypesOfLessons {
    searider = "searider",
    crew = "crew",
    senior = "senior"
}

interface LessonsType {
    _id: string;
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
    _id: string;
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
    _id: string;
    name: string;
    type: TypesOfOptions;
}

/////////////// RESULTS ///////////////

interface ResultType {
    _id: string;
    userId: string;
    date: Date;
    exerciseId: string;
    answers: string[];
    score: number;
}