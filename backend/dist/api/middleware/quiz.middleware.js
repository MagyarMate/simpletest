"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('simpletest:quiz_middleware');
class QuizMiddleware {
    constructor() {
        log('QuizMiddleware created');
    }
}
exports.default = new QuizMiddleware();
//# sourceMappingURL=quiz.middleware.js.map