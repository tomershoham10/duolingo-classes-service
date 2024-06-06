import mongoose, { Schema } from 'mongoose';

enum ExercisesTypes {
    FSA = "fsa",
    SPOTRECC = "spotrecc"
}

const exerciseSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: Object.values(ExercisesTypes),
    },
    relevant: [{
        type: String,
        ref: 'Target'
    }],
    answersList: [{
        type: String,
        ref: 'Target'
    }],
    acceptableAnswers: [{
        type: String,
        ref: 'Target'
    }],
    timeBuffers: {
        type: [{
            timeBuffer: {
                type: Number,
            },
            grade: {
                type: Number,
            },
        }],
        _id: false
    },
    description: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    recordName: {
        type: String,
        ref: 'File'
    },
    fileName: {
        type: String,
        ref: 'File'
    },
});

exerciseSchema.pre('validate', function (next) {
    if (this.type === ExercisesTypes.FSA) {
        if (!!this.fileName || !this.answersList || !this.recordName || !this.timeBuffers) {
            next(new Error('Unmached fields for FSA exercise.'));
        }
    }
    if (this.type === ExercisesTypes.SPOTRECC) {
        if (!!this.relevant || !!this.recordName || !this.fileName || !this.timeBuffers) {
            next(new Error('Unmached fields for Spotrecc exercise.'));
        }
    }
    next();
});

const ExerciseModel = mongoose.model<ExerciseType>('Exercises', exerciseSchema);

export default ExerciseModel;
