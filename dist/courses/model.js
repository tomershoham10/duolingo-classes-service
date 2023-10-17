import mongoose, { Schema } from 'mongoose';
var TypesOfCourses;
(function (TypesOfCourses) {
    TypesOfCourses["searider"] = "SEARIDER";
    TypesOfCourses["crew"] = "CREW";
    TypesOfCourses["senior"] = "SENIOR";
})(TypesOfCourses || (TypesOfCourses = {}));
const CoursesSchema = new Schema({
    id: { type: String },
    type: {
        type: String,
        enum: Object.values(TypesOfCourses),
        required: true,
        unique: true
    },
    units: [{
            type: String,
            ref: 'Units',
            required: true
        }]
});
const CoursesModel = mongoose.model('Courses', CoursesSchema);
export default CoursesModel;
//# sourceMappingURL=model.js.map