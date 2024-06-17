/////////////// COURSES //////////////////

interface CoursesType {
    _id: string;
    name: string;
    units: string[];
    suspendedUnits: string[];
}

/////////////// UNITS //////////////////

interface UnitsType {
    _id: string;
    levels: string[];
    suspendedLevels: string[];
    guidebook?: string;
    description?: string;
}

/////////////// LEVELS ///////////////

interface LevelsType {
    _id: string;
    lessons: string[];
    suspendedLessons: string[];
}

/////////////// LESSONS ///////////////

interface LessonsType {
    _id: string;
    name?: string;
    exercises: string[];
    suspendedExercises: string[];
}

/////////////// EXERCISES ///////////////////

//~~~~~~~~~~~ FSA ~~~~~~~~~~~//

interface TimeBuffersType {
    timeBuffer: number;
    grade: number;
}

enum ExercisesTypes {
    FSA = "fsa",
    SPOTRECC = "spotrecc"
}

// interface FSAType {
//     _id: string;
//     relevant?: string[];
//     answersList: string[]; //may be 2 correct answers
//     acceptableAnswers?: string[];
//     timeBuffers: TimeBuffersType[];
//     description?: string;
//     dateCreated: Date;
//     recordName: string;
// }

// //~~~~~~~~~~~ spotrecc ~~~~~~~~~~~//

// interface SpotreccType {
//     _id: string;
//     timeBuffers: TimeBuffersType[];
//     description?: string;
//     dateCreated: Date;
//     fileName: string;
// }

enum FeaturesList {
    NUMBER_OF_BLADES = "numberOfBlades",
}

interface KeyValueFeatures {
    [feature: FeaturesList]: number | string
}

interface ExerciseType {
    _id: string;
    dateCreated: Date;
    type: ExercisesTypes;
    targetsList?: string[]; //may be 2 correct answers
    timeBuffers: TimeBuffersType[];
    description?: string;
    fileName: string;

    // fsa
    relevant?: string[];
    acceptableTargets?: string[];

    // spotrecc
    notableFeatures: KeyValueFeatures[];
}

/////////////// COUNTRIES ///////////////

interface CountryType {
    _id: string;
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
    _id: string;
    name: string;
    countryId: string;
    type: TypesOfTargets;
    subType: TypesOfVessels | TypesOfTorpedos | TypesOfSonars;
}

/////////////// SOURCES ///////////////

interface SourceType {
    _id: string;
    name: string;
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