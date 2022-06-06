"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('simpletest:auth_middleware');
class AuthMiddleware {
    verifyToken(req, res, next) {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.body.token = bearerToken;
            next();
        }
        else {
            res.sendStatus(403);
        }
    }
}
exports.default = new AuthMiddleware();
//# sourceMappingURL=auth.middleware.js.map