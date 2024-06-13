import { model, Schema } from "mongoose";

const countrySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

const CountryModel = model<CountryType>("Country", countrySchema);

export default CountryModel;
