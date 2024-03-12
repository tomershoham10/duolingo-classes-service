import mongoose, { Schema } from 'mongoose';

const LessonsSchema = new Schema<LessonsType>({
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

const LessonsModel = mongoose.model<LessonsType>('Lessons', LessonsSchema);

export default LessonsModel;
