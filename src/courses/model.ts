import mongoose, { Schema } from 'mongoose';

const CoursesSchema = new Schema<CoursesType>({
    name: { type: String, required: true, unique: true },
    units: [{
        type: String,
        ref: 'Units',
        required: true
    }],
    suspendedUnits: [{
        type: String,
        ref: 'Units',
        required: true
    }]
});

const CoursesModel = mongoose.model<CoursesType>('Courses', CoursesSchema);

export default CoursesModel;

