import mongoose, { Schema } from "mongoose";
enum Types {
  VESSEL = "vessel",
  COUNTRY = "country",
  SONAR = "sonar",
}

const optionSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: Object.values(Types), required: true },
});

const OptionModel = mongoose.model<OptionType>("Option", optionSchema);

export default OptionModel;
