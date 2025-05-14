/////////////// COURSES //////////////////

interface CoursesType {
  _id: string;
  name: string;
  description: string;
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
  name?: string;
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

enum ExercisesTypes {
  FSA = 'fsa',
  SPOTRECC = 'spotrecc',
}

enum FileTypes {
  RECORDS = 'records',
  IMAGES = 'images',
}

interface FileRoute {
  mainId: string;
  subTypeId: string;
  modelId: string;
  fileType: FileTypes;
  objectName: string;
}

interface ExerciseType {
  _id: string;
  dateCreated: Date;
  type: ExercisesTypes;
  adminComments?: string;
}

//~~~~~~~~~~~ FSA ~~~~~~~~~~~//

interface TimeBuffersType {
  timeBuffer: number;
  grade: number;
}

interface FsaType extends ExerciseType {
  timeBuffers: TimeBuffersType[];
  description?: string;
  fileRoute: FileRoute;

  relevant?: string[];
}

//~~~~~~~~~~~ SPOTRECC ~~~~~~~~~~~//
interface SpotreccSubExercise {
  description?: string;
  fileRoute: FileRoute;
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
  father: string;
  children: string[];
  level: number;
  created: Date;
  updated: Date;
  // countryId: string;
  // type: TypesOfTargets;
  // subType: TypesOfVessels | TypesOfTorpedos | TypesOfSonars;
}

/////////////// RELEVANT ///////////////

interface RelevantAmlachType {
  countries: string[];
  organization: string[];
  amlach_main_type: string | null;
  amlach_sub_type: string | null;
  model: string | null;
}

interface RelevantType {
  // as in posi
  _id: string;
  relevant_name: string;
  amlach: RelevantAmlachType[];
  recived_date: Date;
  update_date: Date;
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
