import mongoose, { Schema } from "mongoose";
var TypesOfTargets;
(function (TypesOfTargets) {
    TypesOfTargets["VESSEL"] = "vessel";
    TypesOfTargets["SONAR"] = "sonar";
    TypesOfTargets["TORPEDO"] = "torpedo";
})(TypesOfTargets || (TypesOfTargets = {}));
var TypesOfVessels;
(function (TypesOfVessels) {
    TypesOfVessels["FRIGATE"] = "frigate";
    TypesOfVessels["SUBMARINE"] = "submarine";
    TypesOfVessels["COASTPATROL"] = "coastPatrol";
    TypesOfVessels["CARGO"] = "cargo";
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
const TargetSchema = new Schema({
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
const TargetModel = mongoose.model("Target", TargetSchema);
export default TargetModel;
//# sourceMappingURL=model.js.map