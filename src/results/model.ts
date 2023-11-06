import mongoose, { Schema } from 'mongoose';


const ResultsSchema = new Schema<ResultType>({
    _id: { type: String },
    userId: [{
        type: String,
        ref: 'User',
        required: true
    }],
    date: {
        type: Date,
        required: true
    },
    exerciseId: {
        type: String,
        ref: 'FSA',
        required: true
    },
    answers: [{
        type: String,
        ref: 'Option',
        required: true
    }],
    score: { type: Number, required: true },
});

const ResultsModel = mongoose.model<ResultType>('Result', ResultsSchema);

export default ResultsModel;
