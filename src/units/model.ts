import { model, Schema } from 'mongoose';

const UnitsSchema = new Schema<UnitsType>({
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
  guidebookId: { type: String, ref: 'guidebooks', required: false },
  description: { type: String, required: false },
  name: { type: String, required: false },
});

const UnitsModel = model<UnitsType>('units', UnitsSchema);

export default UnitsModel;
