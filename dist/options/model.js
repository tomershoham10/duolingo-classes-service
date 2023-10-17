import mongoose, { Schema } from "mongoose";
var Types;
(function (Types) {
    Types["VESSEL"] = "vessel";
    Types["COUNTRY"] = "country";
    Types["SONAR"] = "sonar";
})(Types || (Types = {}));
const optionSchema = new Schema({
    id: { type: String },
    name: { type: String, required: true },
    type: { type: String, enum: Object.values(Types), required: true },
});
const OptionModel = mongoose.model("Option", optionSchema);
export default OptionModel;
//# sourceMappingURL=model.js.map