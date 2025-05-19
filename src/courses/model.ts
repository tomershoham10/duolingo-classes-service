import { model, Schema } from 'mongoose';

const CoursesSchema = new Schema<CoursesType>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false }, 
  levelsIds: [
    {
      type: String,
      ref: 'levels',
      required: true,
    },
  ],
  suspendedLevelsIds: [
    {
      type: String,
      ref: 'levels',
      required: true,
    },
  ],
});

const CoursesModel = model<CoursesType>('courses', CoursesSchema);

export default CoursesModel;
