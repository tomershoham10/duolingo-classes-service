import mongoose, { Schema } from 'mongoose';
const LevelSchema = new Schema({
    lessons: [{
            type: String,
            ref: 'Lessons',
            required: true
        }],
});
const LevelsModel = mongoose.model('Levels', LevelSchema);
export default LevelsModel;
//# sourceMappingURL=model.js.map