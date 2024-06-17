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
    filesNames: [{
        type: String,
        ref: 'File'
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

exerciseSchema.pre('validate', function (next) {
    if (this.type === ExercisesTypes.FSA) {
        if (!this.targetsList || !this.timeBuffers || !this.filesNames || this.filesNames.length > 1) {
            next(new Error('Unmached fields for FSA exercise.'));
        }
    }
    if (this.type === ExercisesTypes.SPOTRECC) {
        if (!!this.relevant || !this.filesNames || !this.timeBuffers || !(this.targetsList && this.notableFeatures)) {
            next(new Error('Unmached fields for Spotrecc exercise.'));
        }
    }
    next();
});

const ExerciseModel = model<ExerciseType>('Exercises', exerciseSchema);

export default ExerciseModel;
