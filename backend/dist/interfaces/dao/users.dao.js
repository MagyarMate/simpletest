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
class UsersDAO {
    constructor() {
        log('UsersDAO created');
        this.userModel = typedi_1.Container.get('userModel');
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            log('addUser: %o', user);
            const userRecord = yield this.userModel.create({ username: user.username, password: user.password });
            return userRecord._id.toString();
        });
    }
    getUserByName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            log('getUserByName: %o', username);
            try {
                const userRecord = yield this.userModel.findOne({ username });
                return userRecord;
            }
            catch (err) {
                log('getUserByName: %o', err);
                return null;
            }
        });
    }
    removeUserByName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            log('removeUserByName: %o', username);
            yield this.userModel.deleteOne({ username });
            return 'user deleted';
        });
    }
}
exports.default = new UsersDAO();
//# sourceMappingURL=users.dao.js.map