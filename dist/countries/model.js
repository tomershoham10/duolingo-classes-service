import mongoose, { Schema } from "mongoose";
const countrySchema = new Schema({
    name: { type: String, required: true, unique: true },
});
const CountryModel = mongoose.model("Country", countrySchema);
export default CountryModel;
//# sourceMappingURL=model.js.map