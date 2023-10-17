import mongoose, { Schema } from 'mongoose';
var TypesOfLessons;
(function (TypesOfLessons) {
    TypesOfLessons["searider"] = "SEARIDER";
    TypesOfLessons["crew"] = "CREW";
    TypesOfLessons["senior"] = "SENIOR";
})(TypesOfLessons || (TypesOfLessons = {}));
const LessonsSchema = new Schema({
    id: { type: String },
    name: { type: String, required: false },
    exercises: [{
            type: String,
            ref: 'FSA',
            required: false
        }],
    type: {
        type: String,
        enum: Object.values(TypesOfLessons),
        required: true
    }
});
const LessonsModel = mongoose.model('Lessons', LessonsSchema);
export default LessonsModel;
//# sourceMappingURL=model.js.map