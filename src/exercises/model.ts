import { model, Schema } from 'mongoose';

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

    targetsList: [{
        type: String,
        ref: 'Target'
    }],
    acceptableTargets: [{
        type: String,
        ref: 'Target'
    }],

    notableFeatures: [{
        type: Map,
        of: Schema.Types.Mixed,
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
        type: String,
        required: false,
    },
    fileName: {
        type: String,
        ref: 'File'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

exerciseSchema.pre('validate', function (next) {
    if (this.type === ExercisesTypes.FSA) {
        if (!!this.fileName || !this.targetsList || !this.fileName || !this.timeBuffers) {
            next(new Error('Unmached fields for FSA exercise.'));
        }
    }
    if (this.type === ExercisesTypes.SPOTRECC) {
        if (!!this.relevant || !this.fileName || !this.timeBuffers) {
            next(new Error('Unmached fields for Spotrecc exercise.'));
        }
    }
    next();
});

const ExerciseModel = model<ExerciseType>('Exercises', exerciseSchema);

export default ExerciseModel;
