import mongoose, { Schema } from 'mongoose';
const FSASchema = new Schema({
    filesKeys: [{
            type: String,
            ref: 'File',
            required: true
        }],
    difficultyLevel: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    relevant: [{
            type: String,
            ref: 'Target',
            required: true
        }],
    answers: [{
            type: String,
            ref: 'Target',
            required: true
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
        validate: {
            validator: (arr) => arr.length >= 2,
            message: 'timeBuffers must have at least 2 values',
        },
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    sonolistKeys: [{
            type: String,
            ref: 'File',
            required: true
        }],
});
const FSAModel = mongoose.model('FSA', FSASchema);
export default FSAModel;
//# sourceMappingURL=model.js.map