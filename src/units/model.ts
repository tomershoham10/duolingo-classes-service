import { model, Schema } from 'mongoose';

const UnitsSchema = new Schema<UnitsType>({
    levels: [{
        type: String,
        ref: 'Levels',
        required: true
    }],
    suspendedLevels: [{
        type: String,
        ref: 'Levels',
        required: true
    }],
    guidebook: { type: String, ref: 'Guidebook', required: false },
    description: { type: String, required: false },
});

const UnitsModel = model<UnitsType>('Units', UnitsSchema);

export default UnitsModel;
