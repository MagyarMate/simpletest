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
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('simpletest:user_middleware');
class UsersMiddleware {
    validateRequiredUserBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.username && req.body.password) {
                return next();
            }
            else {
                res.status(400).send('Missing required fields');
            }
        });
    }
    validateUserName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.username || req.query && req.query.username) {
                return next();
            }
            else {
                res.status(400).send('Missing required fields');
            }
        });
    }
    extractUserName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.username) {
                req.body.username = req.query.username;
            }
        });
    }
}
exports.default = new UsersMiddleware();
//# sourceMappingURL=users.middleware.js.map