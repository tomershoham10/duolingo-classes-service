import { model, Schema } from "mongoose";

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
  TUGBOAT = "tugboat"
}

enum TypesOfTorpedos {
  ELECTRIC = "electric"
}

enum TypesOfSonars {
  REGULAR = "regular"
}

const TargetSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  countryId: { type: String, ref: 'Country', required: true },
  type: {
    type: String,
    enum: Object.values(TypesOfTargets),
    required: true
  },
  subType: {
    type: String,
    enum: [...Object.values(TypesOfVessels), ...Object.values(TypesOfTorpedos), ...Object.values(TypesOfSonars)],
    required: true
  },
});

const TargetModel = model<TargetType>("Target", TargetSchema);

export default TargetModel;
