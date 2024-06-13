import { model, Schema } from 'mongoose';

const ResultsSchema = new Schema<ResultType>({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    lessonId: {
        type: String,
        ref: 'Lessons',
        required: true
    },
    exerciseId: {
        type: String,
        ref: 'Exercises',
        required: true
    },
    answers: [{
        type: String,
        ref: 'Target',
        required: true
    }],
    score: { type: Number, required: true },
});

ResultsSchema.index({ userId: 1, lessonId: 1, exerciseId: 1 }, { unique: true });

const ResultsModel = model<ResultType>('Result', ResultsSchema);

export default ResultsModel;
