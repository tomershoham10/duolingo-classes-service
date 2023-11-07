import mongoose, { Schema } from 'mongoose';
const UnitsSchema = new Schema({
    levels: [{
            type: String,
            ref: 'Levels',
            required: true
        }],
    guidebook: { type: String, ref: 'Guidebook', required: false },
    description: { type: String, required: false },
});
const UnitsModel = mongoose.model('Units', UnitsSchema);
export default UnitsModel;
//# sourceMappingURL=model.js.map