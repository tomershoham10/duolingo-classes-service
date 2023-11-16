import mongoose, { Schema } from "mongoose";
var TypesOfTargets;
(function (TypesOfTargets) {
    TypesOfTargets["VESSEL"] = "Vessel";
    TypesOfTargets["SONAR"] = "Sonar";
    TypesOfTargets["TORPEDO"] = "Torpedo";
})(TypesOfTargets || (TypesOfTargets = {}));
var TypesOfVessels;
(function (TypesOfVessels) {
    TypesOfVessels["FRIGATE"] = "frigate";
    TypesOfVessels["SUBMARINE"] = "submarine";
    TypesOfVessels["TUGBOAT"] = "tugboat";
})(TypesOfVessels || (TypesOfVessels = {}));
var TypesOfTorpedos;
(function (TypesOfTorpedos) {
    TypesOfTorpedos["ELECTRIC"] = "electric";
})(TypesOfTorpedos || (TypesOfTorpedos = {}));
var TypesOfSonars;
(function (TypesOfSonars) {
    TypesOfSonars["REGULAR"] = "regular";
})(TypesOfSonars || (TypesOfSonars = {}));
const optionSchema = new Schema({
    name: { type: String, required: true, unique: true },
    type: { type: TypesOfTargets, enum: Object.values(TypesOfTargets), required: true },
    subType: {
        type: String,
        enum: [...Object.values(TypesOfVessels), ...Object.values(TypesOfTorpedos), ...Object.values(TypesOfSonars)],
        required: true
    },
});
const OptionModel = mongoose.model("Option", optionSchema);
export default OptionModel;
//# sourceMappingURL=model.js.map