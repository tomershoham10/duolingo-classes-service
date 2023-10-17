import mongoose, { Schema } from 'mongoose';
const UnitsSchema = new Schema({
    id: String,
    sections: [{
            type: String,
            ref: 'Sections',
            required: true
        }],
    guidebook: { type: String, ref: 'Guidebook', required: false }
});
const UnitsModel = mongoose.model('Units', UnitsSchema);
export default UnitsModel;
//# sourceMappingURL=model.js.map