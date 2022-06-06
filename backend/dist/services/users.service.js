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
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('simpletest:user_service');
class UsersService {
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            log('list: %o; not implemented', limit, page);
            return null;
        });
    }
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            log('create: %o', resource);
            return users_dao_1.default.addUser(resource);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            log('putById: %o; not implemented', id, resource);
            return 'not implemented';
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            log('readById: %o', id);
            return users_dao_1.default.getUserByName(id);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.removeUserByName(id);
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return 'not implemented';
        });
    }
}
exports.default = new UsersService();
//# sourceMappingURL=users.service.js.map