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
const retrieveUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = typedi_1.Container.get('userModel');
        const userName = req.query.username;
        // tslint:disable-next-line:no-console
        console.log('userName: ', userName === null || userName === void 0 ? void 0 : userName.toString());
        if (userName) {
            const userRecord = yield userModel.findOne({ username: userName.toString() });
            if (!userRecord) {
                res.status(404).send('User not found');
            }
            return res.status(200).send(userRecord);
        }
        return next();
    }
    catch (e) {
        return next(e);
    }
});
exports.default = retrieveUser;
//# sourceMappingURL=retrieveUser.js.map