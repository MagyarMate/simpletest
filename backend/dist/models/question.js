"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Question = new mongoose_1.default.Schema({
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
}, { collection: 'questions' });
exports.default = mongoose_1.default.model('Question', Question);
//# sourceMappingURL=question.js.map