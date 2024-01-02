import mongoose, { Schema } from 'mongoose';

const CoursesSchema = new Schema<CoursesType>({
    units: [{
        type: String,
        ref: 'Units',
        required: false
    }]
});

const CoursesModel = mongoose.model<CoursesType>('Courses', CoursesSchema);

export default CoursesModel;

