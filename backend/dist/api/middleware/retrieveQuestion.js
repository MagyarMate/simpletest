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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const retrieveQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questionModel = typedi_1.Container.get('questionModel');
        const questionNumber = req.query.number;
        const questionNumber2 = req.body.number;
        // tslint:disable-next-line: no-console
        console.log(questionNumber2);
        // tslint:disable-next-line: no-console
        console.log('Proba');
        if (questionNumber) {
            const questionRecord = yield questionModel.findOne({ number: questionNumber.toString() });
            if (!questionRecord) {
                return res.status(404).send('Question not found');
            }
            return res.status(200).send(questionRecord);
        }
        return next();
    }
    catch (e) {
        return next(e);
    }
});
exports.default = retrieveQuestion;
//# sourceMappingURL=retrieveQuestion.js.map