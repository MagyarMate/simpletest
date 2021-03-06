"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        index: true
    },
    password: String,
}, { timestamps: true,
    collection: 'users' });
exports.default = mongoose_1.default.model('User', User);
//# sourceMappingURL=user.js.map