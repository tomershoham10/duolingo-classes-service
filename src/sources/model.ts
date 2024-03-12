import mongoose, { Schema } from 'mongoose';

const SourcesSchema = new Schema<SourceType>({
    name: { type: String, required: true, unique: true },
});

const SourcesModel = mongoose.model<SourceType>('Sources', SourcesSchema);

export default SourcesModel;
