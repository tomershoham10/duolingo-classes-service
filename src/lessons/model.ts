import { model, Schema } from 'mongoose';

const LessonsSchema = new Schema<LessonsType>({
    name: { type: String, required: false },
    exercises: [{
        type: String,
        ref: 'Exercises',
        required: true
    }],
    suspendedExercises: [{
        type: String,
        ref: 'Exercises',
        required: true
    }],
});

const LessonsModel = model<LessonsType>('Lessons', LessonsSchema);

export default LessonsModel;
