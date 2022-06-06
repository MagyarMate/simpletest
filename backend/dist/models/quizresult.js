"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shortid_1 = __importDefault(require("shortid"));
const QuizResult = new mongoose_1.default.Schema({
    quizId: {
        type: String,
        default: shortid_1.default.generate
    },
    userId: {
        type: String,
        required: [true, 'UserId is required'],
    },
    questions: [{
            questionNumber: String,
            answer: Number,
            isCorrect: Boolean,
        }]
}, { collection: 'results' });
exports.default = mongoose_1.default.model('QuizResult', QuizResult);
//# sourceMappingURL=quizresult.js.map