import { IQuestion } from '../interfaces/IQuestion';
import mongoose from 'mongoose';

const Question = new mongoose.Schema(
    {
    number: String,
    question: {
        type: String,
        required: [true, 'Question is required'],
        index: true
    },
    answer_a: String,
    answer_b: String,
    answer_c: String,
    answer_d: String,
    correct: Number,
    omit: Boolean,
},
{collection: 'questions'},
);

export default mongoose.model<IQuestion & mongoose.Document>('Question', Question);