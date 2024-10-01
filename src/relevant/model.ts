import { model, Schema } from 'mongoose';

const RelevantSchema = new Schema<RelevantType>({
  relevant_name: {
    type: String,
    required: true,
    unique: true,
  },
  amlach: [
    {
      countries: [{ type: String, ref: 'countries', required: false }],
      organization: [{ type: String, ref: 'organizations', required: false }],
      amlach_main_type: { type: String, ref: 'targets', required: false },
      amlach_sub_type: { type: String, ref: 'targets', required: false },
      model: { type: String, ref: 'targets', required: false },
    },
  ],
  recived_date: { type: Date, default: Date.now, required: true },
  update_date: { type: Date, default: Date.now, required: true },
});

const RelevantModel = model<RelevantType>('relevant', RelevantSchema);

export default RelevantModel;
