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
    relevant: string[];
    answers: string[]; //my be 2 correct answers
    firstTimeBuffer: number; //in minutes
    secondTimeBuffer: number; //in minutes
    description: string;
    dateCreated: Date;
}

/////////////// OPTIONS ///////////////

enum TypesOfTargets {
    VESSEL = "vessel",
    SONAR = "sonar",
    TORPEDO = "Torpedo"
}


enum TypesOfVessels {
    FRIGATE = "frigate",
    SUBMARINE = "submarine",
    TUGBOAT = "tugboat",
}

enum TypesOfTorpedos {
    ELECTRIC = "electric"
}

enum TypesOfSonars {
    REGULAR = "regular"
}

interface OptionType {
    id: string;
    name: string;
    type: TypesOfTargets;
    subType: TypesOfVessels | TypesOfTorpedos | TypesOfSonars;
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