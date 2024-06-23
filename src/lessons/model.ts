import { model, Schema } from 'mongoose';

const LessonsSchema = new Schema<LessonsType>({
    name: { type: String, required: false },
    exercisesIds: [{
        type: String,
        ref: 'exercises',
        required: true
    }],
    suspendedExercisesIds: [{
        type: String,
        ref: 'exercises',
        required: true
    }],
});

const LessonsModel = model<LessonsType>('lessons', LessonsSchema);

export default LessonsModel;
