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
exports.UsersController = void 0;
const users_service_1 = __importDefault(require("../../services/users.service"));
const argon2_1 = __importDefault(require("argon2"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('simpletest:user_controller');
class UsersController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = yield argon2_1.default.hash(req.body.password);
            const user = yield users_service_1.default.create(req.body);
            return res.status(200).send(user);
        });
    }
    getUserByName(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.readById((_a = req.query.username) === null || _a === void 0 ? void 0 : _a.toString());
            if (!user) {
                return res.status(404).send('User not found');
            }
            return res.status(200).send(user);
        });
    }
    removeUserByName(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResponse = yield users_service_1.default.deleteById((_a = req.body.username) === null || _a === void 0 ? void 0 : _a.toString());
            return res.status(200).send(deleteResponse);
        });
    }
    checkUserDuplication(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield users_service_1.default.readById((_a = req.body.username) === null || _a === void 0 ? void 0 : _a.toString());
                if (user) {
                    return res.status(409).send('User already exists');
                }
                return next();
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.UsersController = UsersController;
exports.default = new UsersController();
//# sourceMappingURL=users.controller.js.map