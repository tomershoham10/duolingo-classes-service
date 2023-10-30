import mongoose, { Schema } from 'mongoose';

enum TypesOfCourses {
    searider = "searider",
    crew = "crew",
    senior = "senior"
}

const CoursesSchema = new Schema<CoursesType>({
    id: { type: String },
    type: {
        type: String,
        enum: Object.values(TypesOfCourses),
        required: true,
        unique: true
    },
    units: [{
        type: String,
        ref: 'Units',
        required: false
    }]
});

const CoursesModel = mongoose.model<CoursesType>('Courses', CoursesSchema);

export default CoursesModel;

