"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const express_1 = require("express");
const users_middleware_1 = __importDefault(require("../middleware/users.middleware"));
const debug_1 = __importDefault(require("debug"));
const route = (0, express_1.Router)();
const log = (0, debug_1.default)('simpletest:user_routes');
exports.default = (app) => {
    log('Setup users routes');
    app.use('/users', route);
    const usersController = typedi_1.Container.get('userController');
    const authController = typedi_1.Container.get('authController');
    route.all('/', (req, res, next) => {
        next();
    })
        .get('/', users_middleware_1.default.validateUserName, usersController.getUserByName)
        .post('/', users_middleware_1.default.validateRequiredUserBodyFields, authController.verifyUser, usersController.checkUserDuplication, usersController.createUser)
        .delete('/', users_middleware_1.default.validateUserName, authController.verifyUser, usersController.removeUserByName);
};
//# sourceMappingURL=user.routes.js.map