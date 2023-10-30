import mongoose, { Schema } from 'mongoose';

const UnitsSchema = new Schema<UnitsType>({
    id: { type: String },
    sections: [{
        type: String,
        ref: 'Sections',
        required: true
    }],
    guidebook: { type: String, ref: 'Guidebook', required: false },
    description: { type: String, required: false },
});

const UnitsModel = mongoose.model<UnitsType>('Units', UnitsSchema);

export default UnitsModel;
