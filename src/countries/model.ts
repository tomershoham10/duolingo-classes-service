import mongoose, { Schema } from "mongoose";

const countrySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

const CountryModel = mongoose.model<CountryType>("Country", countrySchema);

export default CountryModel;
