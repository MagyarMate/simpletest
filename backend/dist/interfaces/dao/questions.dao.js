"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('simpletest:question_dao');
class QuestionsDAO {
    constructor() {
        log('QuestionDAO created');
        this.questionModel = typedi_1.Container.get('questionModel');
        this.quizResultModel = typedi_1.Container.get('quizResultModel');
    }
    getQuestionByNumber(questionNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            log('getQuestionByNumber: %o', questionNumber);
            try {
                const questionRecord = yield this.questionModel.findOne({ number: questionNumber });
                return questionRecord;
            }
            catch (err) {
                log('getQuestionByNumber: %o', err);
                return null;
            }
        });
    }
    updateQuestionByNumber(questionNumber, question) {
        return __awaiter(this, void 0, void 0, function* () {
            log('updateQuestionByNumber: %o', questionNumber, question);
            try {
                const questionRecord = yield this.questionModel.findOneAndUpdate({ number: questionNumber }, question);
                return questionRecord;
            }
            catch (err) {
                log('updateQuestionByNumber: %o', err);
                return null;
            }
        });
    }
    getQuestionAmount() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.questionModel.countDocuments();
        });
    }
    getQuizResult(quizId) {
        return __awaiter(this, void 0, void 0, function* () {
            log('getQuizResult: %o', quizId);
            try {
                const quizRecord = yield this.quizResultModel.findOne({ quizId });
                return quizRecord;
            }
            catch (err) {
                return null;
            }
        });
    }
    getQuizResultList({ limit = 15, page = 1, username }) {
        return __awaiter(this, void 0, void 0, function* () {
            log('getQuizResultList: %o', limit, page);
            try {
                if (!username) {
                    const quizRecordList = yield this.quizResultModel.find({}).skip(limit * (page - 1)).limit(limit);
                    return quizRecordList;
                }
                const quizRecordListFiltered = yield this.quizResultModel.find({ userId: username }).skip(limit * (page - 1)).limit(limit);
                return quizRecordListFiltered;
            }
            catch (err) {
                return [];
            }
        });
    }
    createQuizResult(quizResult) {
        return __awaiter(this, void 0, void 0, function* () {
            log('createQuizResult: %o', quizResult);
            try {
                const quizRecord = yield this.quizResultModel.create(quizResult);
                return quizRecord.quizId;
            }
            catch (err) {
                return null;
            }
        });
    }
}
exports.default = new QuestionsDAO();
//# sourceMappingURL=questions.dao.js.map