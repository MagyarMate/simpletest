"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const quiz_routes_1 = __importDefault(require("./routes/quiz.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
exports.default = () => {
    const app = (0, express_1.Router)();
    (0, user_routes_1.default)(app);
    (0, auth_routes_1.default)(app);
    (0, quiz_routes_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map