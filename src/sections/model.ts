import mongoose, { Schema } from 'mongoose';

const SectionSchema = new Schema<SectionsType>({
    id: String,
    lessons: [{
        type: String,
        ref: 'Lessons',
        required: true
    }],
});

const SectionsModel = mongoose.model<SectionsType>('Sections', SectionSchema);

export default SectionsModel;
