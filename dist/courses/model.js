import mongoose, { Schema } from 'mongoose';
const CoursesSchema = new Schema({
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
const CoursesModel = mongoose.model('Courses', CoursesSchema);
export default CoursesModel;
//# sourceMappingURL=model.js.map