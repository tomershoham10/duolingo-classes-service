import { model, Schema } from 'mongoose';

const TargetSchema: Schema = new Schema<TargetType>({
  name: { type: String, required: true, unique: false },
  organization: [{ type: String, ref: 'organizations', required: false }],
  father: {
    type: String,
    ref: 'targets',
    required: function (this: TargetType) {
      return this.level > 1;
    },
  },
  children: [{ type: String, ref: 'targets' }],
  level: { type: Number, required: true, enum: [1, 2, 3], unique: false },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true },
});

const TargetModel = model<TargetType>('targets', TargetSchema);

export default TargetModel;
