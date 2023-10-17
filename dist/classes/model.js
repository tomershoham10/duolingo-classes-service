import mongoose, { Schema } from 'mongoose';
var TypesOfClasses;
(function (TypesOfClasses) {
    TypesOfClasses["searider"] = "SEARIDER";
    TypesOfClasses["crew"] = "CREW";
    TypesOfClasses["senior"] = "SENIOR";
})(TypesOfClasses || (TypesOfClasses = {}));
const ClassesSchema = new Schema({
    id: { type: String },
    type: {
        type: String,
        enum: Object.values(TypesOfClasses),
        required: true,
        unique: true
    },
    units: [{
            type: String,
            ref: 'Units',
            required: false
        }]
});
const ClassesModel = mongoose.model('Classes', ClassesSchema);
export default ClassesModel;
//# sourceMappingURL=model.js.map