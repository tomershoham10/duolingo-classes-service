import mongoose, { Schema } from 'mongoose';

enum TypesOfLessons {
    searider = "SEARIDER",
    crew = "CREW",
    senior = "SENIOR"
}

const LessonsSchema = new Schema<LessonsType>({
    name: { type: String, required: false },
    exercises: [{
        type: String,
        ref: 'FSA',
        required: false
    }],
    index: { type: Number, required: false },
    type: {
        type: String,
        enum: Object.values(TypesOfLessons),
        required: true
    }
});

const LessonsModel = mongoose.model<LessonsType>('Lesson', LessonsSchema);

export default LessonsModel;
