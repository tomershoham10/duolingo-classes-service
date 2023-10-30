import mongoose, { Schema } from 'mongoose';
var TypesOfCourses;
(function (TypesOfCourses) {
    TypesOfCourses["searider"] = "searider";
    TypesOfCourses["crew"] = "crew";
    TypesOfCourses["senior"] = "senior";
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
            required: false
        }]
});
const CoursesModel = mongoose.model('Courses', CoursesSchema);
export default CoursesModel;
//# sourceMappingURL=model.js.map