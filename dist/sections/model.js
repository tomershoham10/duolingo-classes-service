import mongoose, { Schema } from 'mongoose';
const SectionSchema = new Schema({
    name: { type: String, required: false },
    lessons: [{
            type: String,
            ref: 'Lessons',
            required: true
        }],
});
const SectionsModel = mongoose.model('Sections', SectionSchema);
export default SectionsModel;
//# sourceMappingURL=model.js.map