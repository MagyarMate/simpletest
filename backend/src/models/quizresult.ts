import { IQuestionResult } from './../interfaces/IQuestionResult';
import { IQuizResult } from '../interfaces/IQuizResult';
import mongoose from 'mongoose';
import shortid from 'shortid';

const QuizResult = new mongoose.Schema(
    {
    quizId: {
        type: String,
        default: shortid.generate
    },
    userId: {
        type: String,
        required: [true, 'UserId is required'],
    },
    questions: [{
        questionId: String,
        answer: Number,
        isCorrect: Boolean,
    }]
},
{collection: 'results'},
);

export default mongoose.model<IQuizResult & mongoose.Document>('QuizResult', QuizResult);