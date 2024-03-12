import mongoose, { Schema } from 'mongoose';
const LessonsSchema = new Schema({
    name: { type: String, required: false },
    exercises: [{
            type: String,
            ref: 'FSA',
            required: true
        }],
    suspendedExercises: [{
            type: String,
            ref: 'FSA',
            required: true
        }],
});
const LessonsModel = mongoose.model('Lessons', LessonsSchema);
export default LessonsModel;
//# sourceMappingURL=model.js.map