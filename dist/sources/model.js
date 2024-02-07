import mongoose, { Schema } from 'mongoose';
const SourcesSchema = new Schema({
    name: { type: String, required: true },
});
const SourcesModel = mongoose.model('Sources', SourcesSchema);
export default SourcesModel;
//# sourceMappingURL=model.js.map