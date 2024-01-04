/////////////// COURSES //////////////////

interface CoursesType {
    _id: string;
    name:string;
    units: string[];
}

/////////////// UNITS //////////////////

interface UnitsType {
    _id: string;
    levels: string[];
    guidebook?: string;
    description?: string;
}

/////////////// LEVELS ///////////////

interface LevelsType {
    _id: string;
    lessons: string[];
}

/////////////// LESSONS ///////////////

interface LessonsType {
    _id: string;
    name?: string;
    exercises?: string[];
}

/////////////// FSA ///////////////////

interface TimeBuffersType {
    timeBuffer: number;
    grade: number;
}

interface FSAType {
    _id: string;
    recordsKeys: string[];
    difficultyLevel: number;
    relevant?: string[];
    answersList: string[]; //may be 2 correct answers
    timeBuffers: TimeBuffersType[];
    description?: string;
    dateCreated: Date;
    sonolistKeys: string[];
}

/////////////// COUNTRIES ///////////////

interface CountryType {
    id: string;
    name: string;
}

/////////////// TARGETS ///////////////

enum TypesOfTargets {
    VESSEL = "vessel",
    SONAR = "sonar",
    TORPEDO = "torpedo"
}

enum TypesOfVessels {
    FRIGATE = "frigate",
    SUBMARINE = "submarine",
    COASTPATROL = "coastPatrol",
    CARGO = "cargo",
    TUGBOAT = "tugboat",
}

enum TypesOfTorpedos {
    ELECTRIC = "electric"
}

enum TypesOfSonars {
    REGULAR = "regular"
}

interface TargetType {
    id: string;
    name: string;
    countryId: string;
    type: TypesOfTargets;
    subType: TypesOfVessels | TypesOfTorpedos | TypesOfSonars;
}

/////////////// RESULTS ///////////////

interface ResultType {
    _id: string;
    userId: string;
    date: Date;
    lessonId: string;
    exerciseId: string;
    answers: string[];
    score: number;
}