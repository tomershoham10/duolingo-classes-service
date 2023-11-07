import mongoose, { Schema } from 'mongoose';

const LevelSchema = new Schema<LevelsType>({
    id: { type: String },
    lessons: [{
        type: String,
        ref: 'Lessons',
        required: true
    }],
});

const LevelsModel = mongoose.model<LevelsType>('Levels', LevelSchema);

export default LevelsModel;
