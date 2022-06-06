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
const express_1 = __importDefault(require("./express"));
const mongoose_1 = __importDefault(require("./mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('simpletest:app');
exports.default = ({ expressApp }) => __awaiter(void 0, void 0, void 0, function* () {
    log('Creating database connection');
    const mongoConnection = yield (0, mongoose_1.default)();
    const userModel = {
        name: 'userModel',
        model: require('../models/user').default,
    };
    const questionModel = {
        name: 'questionModel',
        model: require('../models/question').default,
    };
    const quizResultModel = {
        name: 'quizResultModel',
        model: require('../models/quizresult').default,
    };
    log('Loading models');
    typedi_1.Container.set(userModel.name, userModel.model);
    typedi_1.Container.set(questionModel.name, questionModel.model);
    typedi_1.Container.set(quizResultModel.name, quizResultModel.model);
    log('Loading controllers');
    typedi_1.Container.set('userController', require('../api/controller/users.controller').default);
    typedi_1.Container.set('quizController', require('../api/controller/quiz.controller').default);
    typedi_1.Container.set('authController', require('../api/controller/auth.controller').default);
    yield (0, express_1.default)({ app: expressApp });
});
//# sourceMappingURL=index.js.map