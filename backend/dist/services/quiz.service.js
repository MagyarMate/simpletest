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
const questions_dao_1 = __importDefault(require("../interfaces/dao/questions.dao"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('simpletest:quiz_service');
class QuizService {
    list(limit = 15, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const questionAmount = yield questions_dao_1.default.getQuestionAmount();
            let questionList = [];
            // Creating a list of question numbers
            let questonNumberArray = Array.from({ length: questionAmount }, (_, i) => i + 1);
            questonNumberArray = this.fisherYates(questonNumberArray).slice(0, limit + 10); // +10 to gracefully handle corrupted data in the database
            for (const questionNumber of questonNumberArray) {
                const question = yield questions_dao_1.default.getQuestionByNumber(questionNumber.toString());
                if (question && !question.omit) {
                    questionList.push(question);
                }
            }
            questionList = questionList.slice(0, limit);
            log('Returned question amount: %o', questionList.length);
            return questionList;
        });
    }
    listResults({ limit = 15, page = 1, username }) {
        return __awaiter(this, void 0, void 0, function* () {
            log('listResults: %o; not implemented', limit, page);
            const resultList = yield questions_dao_1.default.getQuizResultList({ limit, page, username });
            return resultList;
        });
    }
    getQuizResultById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            log('getQuizResultById: %o', id);
            return questions_dao_1.default.getQuizResult(id);
        });
    }
    createQuizResult(answers, username) {
        return __awaiter(this, void 0, void 0, function* () {
            log('createQuizResult: %o', answers, username);
            const result = { userId: username, questions: [] };
            for (const answer of answers) {
                log('Answer: %o', answer);
                const question = yield questions_dao_1.default.getQuestionByNumber(answer.questionNumber.toString());
                if (question) {
                    const questionResult = {
                        questionNumber: answer.questionNumber,
                        answer: answer.answer,
                        isCorrect: (question.correct === answer.answer)
                    };
                    result.questions.push(questionResult);
                }
            }
            return questions_dao_1.default.createQuizResult(result);
        });
    }
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            log('create: %o; not implemented', resource);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            log('putById: %o; not implemented', id, resource);
            return 'not implemented';
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            log('readById: %o', id);
            return questions_dao_1.default.getQuestionByNumber(id);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            log('deleteById: %o; not implemented', id);
            return 'not implemented';
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            questions_dao_1.default.updateQuestionByNumber(id, resource);
            return 'Question updated';
        });
    }
    // Helper functions
    fisherYates(array) {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
}
exports.default = new QuizService();
//# sourceMappingURL=quiz.service.js.map