import mongoose, { Schema } from "mongoose";

enum Types {
  VESSEL = "vessel",
  COUNTRY = "country",
  SONAR = "sonar",
}

interface OptionType {
  name: string;
  type: Types;
}

const optionSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: Object.values(Types), required: true },
});

const OptionModel = mongoose.model<OptionType>("Option", optionSchema);

export { OptionModel, OptionType, Types };
