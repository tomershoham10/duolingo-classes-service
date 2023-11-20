import mongoose, { Schema } from 'mongoose';


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
    exerciseId: {
        type: String,
        ref: 'FSA',
        required: true
    },
    answers: [{
        type: String,
        ref: 'Target',
        required: true
    }],
    score: { type: Number, required: true },
});

const ResultsModel = mongoose.model<ResultType>('Result', ResultsSchema);

export default ResultsModel;
