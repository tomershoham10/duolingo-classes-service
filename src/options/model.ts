import mongoose, { Schema } from "mongoose";

enum TypesOfTargets {
  VESSEL = "Vessel",
  SONAR = "Sonar",
  TORPEDO = "Torpedo"
}

enum TypesOfVessels {
  FRIGATE = "frigate",
  SUBMARINE = "submarine",
  TUGBOAT = "tugboat",
}

enum TypesOfTorpedos {
  ELECTRIC = "electric"
}

enum TypesOfSonars {
  REGULAR = "regular"
}

const optionSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
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

const OptionModel = mongoose.model<OptionType>("Option", optionSchema);

export default OptionModel;
