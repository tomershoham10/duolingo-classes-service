import  {model, Schema } from 'mongoose';

const LevelSchema = new Schema<LevelsType>({
    lessons: [{
        type: String,
        ref: 'Lessons',
        required: true
    }],
    suspendedLessons: [{
        type: String,
        ref: 'Lessons',
        required: true
    }],
});

const LevelsModel = model<LevelsType>('Levels', LevelSchema);

export default LevelsModel;
