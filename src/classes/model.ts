import mongoose, { Schema } from 'mongoose';

enum TypesOfClasses {
    searider = "SEARIDER",
    crew = "CREW",
    senior = "SENIOR"
}

const ClassesSchema = new Schema<ClassesType>({
    id: { type: String },
    type: {
        type: String,
        enum: Object.values(TypesOfClasses),
        required: true,
        unique: true
    },
    units: [{
        type: String,
        ref: 'Units',
        required: false
    }]
});

const ClassesModel = mongoose.model<ClassesType>('Classes', ClassesSchema);

export default ClassesModel;

