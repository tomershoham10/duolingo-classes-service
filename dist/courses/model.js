import mongoose, { Schema } from 'mongoose';
const CoursesSchema = new Schema({
    units: [{
            type: String,
            ref: 'Units',
            required: false
        }]
});
const CoursesModel = mongoose.model('Courses', CoursesSchema);
export default CoursesModel;
//# sourceMappingURL=model.js.map