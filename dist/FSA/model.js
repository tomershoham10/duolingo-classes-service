import mongoose, { Schema } from 'mongoose';
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel["Easy"] = "Easy";
    DifficultyLevel["Medium"] = "Medium";
    DifficultyLevel["Hard"] = "Hard";
})(DifficultyLevel || (DifficultyLevel = {}));
const FSASchema = new Schema({
    filesKeys: [{
            type: String,
            ref: 'File',
            required: true
        }],
    difficultyLevel: {
        type: String,
        enum: Object.values(DifficultyLevel),
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
    firstTimeBuffer: {
        type: Number,
        required: true
    },
    secondTimeBuffer: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});
const FSAModel = mongoose.model('FSA', FSASchema);
export default FSAModel;
//# sourceMappingURL=model.js.map