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
exports.QuizController = void 0;
const quiz_service_1 = __importDefault(require("../../services/quiz.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('simpletest:quiz_controller');
class QuizController {
    getQuestionByNumber(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            log(req.body);
            const question = yield quiz_service_1.default.readById((_a = req.query.number) === null || _a === void 0 ? void 0 : _a.toString());
            if (!question) {
                return res.status(404).send('Question not found');
            }
            return res.status(200).send(question);
        });
    }
    updateQuestionByNumber(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            quiz_service_1.default.patchById((_a = req.query.number) === null || _a === void 0 ? void 0 : _a.toString(), req.body);
            return res.status(200).send('Question updated');
        });
    }
    checkQuestion(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = yield quiz_service_1.default.readById((_a = req.query.number) === null || _a === void 0 ? void 0 : _a.toString());
                if (!question) {
                    return res.status(404).send('Question not found');
                }
                return next();
            }
            catch (err) {
                return next(err);
            }
        });
    }
    getRandomQuestionList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = yield quiz_service_1.default.list();
            if (!question) {
                return res.status(500).send('Internal server error');
            }
            return res.status(200).send(question);
        });
    }
    getQuizResultList(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            log('Req body currentUser:%o', req.query.username);
            const currentUser = (_a = req.query.username) === null || _a === void 0 ? void 0 : _a.toString();
            const results = yield quiz_service_1.default.listResults({ username: currentUser });
            if (!results) {
                return res.status(500).send('Internal server error');
            }
            return res.status(200).send(results);
        });
    }
    getQuizResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = req.body.currentUser;
            const resultId = req.params.resultId;
            const result = yield quiz_service_1.default.getQuizResultById(resultId);
            if (!result) {
                return res.status(404).send('Result not found');
            }
            return res.status(200).send(result);
        });
    }
    createQuizResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userName = req.body.currentUser;
            const answerList = req.body.answerList;
            log('Req body answerlist:%o', req.body.answerList);
            log('Req body currentUser:%o', req.body.currentUser);
            const quizId = yield quiz_service_1.default.createQuizResult(answerList, userName);
            if (!quizId) {
                return res.status(500).send('Internal server error');
            }
            return res.status(200).send({ quizId });
        });
    }
}
exports.QuizController = QuizController;
exports.default = new QuizController();
//# sourceMappingURL=quiz.controller.js.map