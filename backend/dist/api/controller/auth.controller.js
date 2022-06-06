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
exports.AuthController = void 0;
const auth_service_1 = __importDefault(require("../../services/auth.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('simpletest:auth_controller');
class AuthController {
    createToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield auth_service_1.default.create_token(req.body.username, req.body.password);
            if (!token) {
                return res.status(401).send('Invalid credentials');
            }
            return res.status(200).json({ username: req.body.username, token });
        });
    }
    verifyUser(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!token) {
                    return res.status(401).send('Invalid token');
                }
                const decoded = yield auth_service_1.default.verify_token(token);
                req.body.currentUser = decoded.username;
                next();
            }
            catch (err) {
                if (err) {
                    res.status(401).send('Expired token');
                    return;
                }
                res.status(500).send('Internal server error');
            }
        });
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map