import mongoose, { Schema } from 'mongoose';
const FSASchema = new Schema({
    relevant: [{
            type: String,
            ref: 'Target',
            required: false
        }],
    answersList: [{
            type: String,
            ref: 'Target',
            required: true
        }],
    acceptableAnswers: [{
            type: String,
            ref: 'Target',
            required: false
        }],
    timeBuffers: {
        type: [{
                timeBuffer: {
                    type: Number,
                    required: true,
                },
                grade: {
                    type: Number,
                    required: true,
                },
            }],
        required: true,
        _id: false
    },
    description: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    recordKey: {
        type: String,
        ref: 'File',
        required: true
    },
});
const FSAModel = mongoose.model('FSA', FSASchema);
export default FSAModel;
//# sourceMappingURL=model.js.map