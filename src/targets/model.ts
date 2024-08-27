import { model, Schema } from 'mongoose';

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

const TargetSchema: Schema = new Schema<TargetType>({
  name: { type: String, required: true, unique: false },
  organization: [{ type: String, ref: 'organizations', required: true }],
  children: [{ type: String, ref: 'targets' }],
  level: { type: Number, required: true, unique: false },
  created: { type: Date, required: true },
  updated: { type: Date, required: true },
});

const TargetModel = model<TargetType>('targets', TargetSchema);

export default TargetModel;
