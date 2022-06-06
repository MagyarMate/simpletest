"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const express_1 = require("express");
const debug_1 = __importDefault(require("debug"));
const route = (0, express_1.Router)();
const log = (0, debug_1.default)('simpletest:auth_routes');
exports.default = (app) => {
    log('Setup auth routes');
    app.use('/login', route);
    const authController = typedi_1.Container.get('authController');
    route.all('/', (req, res, next) => {
        next();
    })
        .post('/', authController.createToken);
};
//# sourceMappingURL=auth.routes.js.map