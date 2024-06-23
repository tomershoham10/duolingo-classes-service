import { model, Schema } from 'mongoose';

enum ExercisesTypes {
    FSA = "fsa",
    SPOTRECC = "spotrecc"
}

enum BucketsNames {
    RECORDS = 'records',
    IMAGES = 'images',
}

enum FeaturesList {
    NUMBER_OF_BLADES = "numberOfBlades",
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

    notableFeatures: {
        type: [{
            type: {
                enum: Object.values(FeaturesList),
            },
            value: {
                type: Number || String,
            },
        }],
        _id: false
    },

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
    files: {
        type: [{
            filName: {
                type: String,
                ref: 'File'
            },
            bucket: {
                enum: Object.values(BucketsNames),
            },
        }],
        _id: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

exerciseSchema.pre('validate', function (next) {
    if (this.type === ExercisesTypes.FSA) {
        if (!this.targetsList || !this.timeBuffers || !this.files || this.files.length > 1) {
            next(new Error('Unmached fields for FSA exercise.'));
        }
    }
    if (this.type === ExercisesTypes.SPOTRECC) {
        if (!!this.relevant || !this.files || !this.timeBuffers || !(this.targetsList && this.notableFeatures)) {
            next(new Error('Unmached fields for Spotrecc exercise.'));
        }
    }
    next();
});

const ExerciseModel = model<ExerciseType>('exercises', exerciseSchema);

export default ExerciseModel;
