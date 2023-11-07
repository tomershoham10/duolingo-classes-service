import mongoose, { Schema } from 'mongoose';
var TypesOfLessons;
(function (TypesOfLessons) {
    TypesOfLessons["searider"] = "searider";
    TypesOfLessons["crew"] = "crew";
    TypesOfLessons["senior"] = "senior";
})(TypesOfLessons || (TypesOfLessons = {}));
const LessonsSchema = new Schema({
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