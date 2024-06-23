import  {model, Schema } from 'mongoose';

const LevelSchema = new Schema<LevelsType>({
    lessonsIds: [{
        type: String,
        ref: 'lessons',
        required: true
    }],
    suspendedLessonsIds: [{
        type: String,
        ref: 'lessons',
        required: true
    }],
});

const LevelsModel = model<LevelsType>('levels', LevelSchema);

export default LevelsModel;
