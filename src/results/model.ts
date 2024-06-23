import { model, Schema } from 'mongoose';

const ResultsSchema = new Schema<ResultType>({
    userId: {
        type: String,
        ref: 'users',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    lessonId: {
        type: String,
        ref: 'lessons',
        required: true
    },
    exerciseId: {
        type: String,
        ref: 'exercises',
        required: true
    },
    answers: [{
        type: String,
        ref: 'targets',
        required: true
    }],
    score: { type: Number, required: true },
});

ResultsSchema.index({ userId: 1, lessonId: 1, exerciseId: 1 }, { unique: true });

const ResultsModel = model<ResultType>('results', ResultsSchema);

export default ResultsModel;
