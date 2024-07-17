import { model, Schema } from 'mongoose';

const CoursesSchema = new Schema<CoursesType>({
  name: { type: String, required: true, unique: true },
  unitsIds: [
    {
      type: String,
      ref: 'units',
      required: true,
    },
  ],
  suspendedUnitsIds: [
    {
      type: String,
      ref: 'units',
      required: true,
    },
  ],
});

const CoursesModel = model<CoursesType>('courses', CoursesSchema);

export default CoursesModel;
