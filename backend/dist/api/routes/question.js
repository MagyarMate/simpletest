"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = __importDefault(require("../middleware"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/questions', route);
    route.all('/', (req, res, next) => {
        next();
    })
        .get('/', middleware_1.default.retrieveQuestion, (req, res) => {
        res.status(200).send('Get question');
    });
};
//# sourceMappingURL=question.js.map