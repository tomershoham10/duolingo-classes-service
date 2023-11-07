import mongoose, { Schema } from 'mongoose';

enum TypesOfLessons {
    searider = "searider",
    crew = "crew",
    senior = "senior"
}

const LessonsSchema = new Schema<LessonsType>({
    name: { type: String, required: false },
    exercises: [{
        type: String,
        ref: 'FSA',
        required: false
    }],
    type: {
        type: String,
        enum: Object.values(TypesOfLessons),
        required: true
    }
});

const LessonsModel = mongoose.model<LessonsType>('Lessons', LessonsSchema);

export default LessonsModel;
