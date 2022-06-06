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
const users_dao_1 = __importDefault(require("../interfaces/dao/users.dao"));
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('simpletest:auth_service');
class AuthService {
    create_token(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            log('readById: %o', userName);
            const userFromDb = yield users_dao_1.default.getUserByName(userName);
            // Check if user exists in db
            if (!userFromDb) {
                return null;
            }
            if (!userFromDb.password) {
                return null;
            }
            // Check if password is correct
            const isPasswordCorrect = yield argon2_1.default.verify(userFromDb.password, password);
            const payload = { username: userName };
            if (isPasswordCorrect) {
                const SignInOptions = {
                    algorithm: 'HS256',
                    expiresIn: '1h'
                };
                return jsonwebtoken_1.default.sign(payload, config_1.default.secret, SignInOptions);
            }
            return null;
        });
    }
    verify_token(token) {
        const secret = config_1.default.secret;
        const verifyOptions = {
            algorithms: ['HS256']
        };
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, secret, verifyOptions, (err, decoded) => {
                if (err)
                    return reject(err);
                resolve(decoded);
            });
        });
    }
    ;
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map