/////////////// COURSES //////////////////

interface CoursesType {
  _id: string;
  name: string;
  unitsIds: string[];
  suspendedUnitsIds: string[];
}

/////////////// UNITS //////////////////

interface UnitsType {
  _id: string;
  levelsIds: string[];
  suspendedLevelsIds: string[];
  guidebookId?: string;
  description?: string;
}

/////////////// LEVELS ///////////////

interface LevelsType {
  _id: string;
  lessonsIds: string[];
  suspendedLessonsIds: string[];
}

/////////////// LESSONS ///////////////

interface LessonsType {
  _id: string;
  name?: string;
  exercisesIds: string[];
  suspendedExercisesIds: string[];
}

/////////////// EXERCISES ///////////////////

interface ExerciseType {
  _id: string;
  dateCreated: Date;
  type: ExercisesTypes;
}

//~~~~~~~~~~~ FSA ~~~~~~~~~~~//

interface TimeBuffersType {
  timeBuffer: number;
  grade: number;
}

enum ExercisesTypes {
  FSA = 'fsa',
  SPOTRECC = 'spotrecc',
}

enum FeaturesList {
  NUMBER_OF_BLADES = 'numberOfBlades',
}

enum BucketsNames {
  RECORDS = 'records',
  IMAGES = 'images',
}

interface FeatureObject {
  type: FeaturesList;
  value: number | string;
}

interface FileObject {
  fileName: string;
  bucket: BucketsNames;
}

interface FsaType extends ExerciseType {
  targetsList?: string[]; //may be 2 correct answers
  timeBuffers: TimeBuffersType[];
  description?: string;
  fileName: string;

  relevant?: string[];
  acceptableTargets?: string[];
}

//~~~~~~~~~~~ SPOTRECC ~~~~~~~~~~~//
interface SpotreccSubExercise {
  description?: string;
  fileName: string;
  exerciseTime: number; // in seconds
  bufferTime: number; // in seconds
}

interface SpotreccType extends ExerciseType {
  subExercises: SpotreccSubExercise[];
}

/////////////// ORGANIZATION ///////////////

interface OrganizationType {
  _id: string;
  organization_name: string;
  country: string;
}

/////////////// COUNTRIES ///////////////

interface CountryType {
  _id: string;
  country_name: string;
}

/////////////// TARGETS ///////////////

// enum TypesOfTargets {
//   VESSEL = 'vessel',
//   SONAR = 'sonar',
//   TORPEDO = 'torpedo',
// }

// enum TypesOfVessels {
//   FRIGATE = 'frigate',
//   SUBMARINE = 'submarine',
//   COASTPATROL = 'coastPatrol',
//   CARGO = 'cargo',
//   TUGBOAT = 'tugboat',
// }

// enum TypesOfTorpedos {
//   ELECTRIC = 'electric',
// }

// enum TypesOfSonars {
//   REGULAR = 'regular',
// }

interface TargetType {
  // as in posi
  _id: string;
  name: string;
  organization: string[];
  children: string[];
  level: number;
  created: Date;
  updated: Date;
  // countryId: string;
  // type: TypesOfTargets;
  // subType: TypesOfVessels | TypesOfTorpedos | TypesOfSonars;
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
