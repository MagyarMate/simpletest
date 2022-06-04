import { CRUD } from '../interfaces/ICrud';
import usersDao from '../interfaces/dao/users.dao';
import { CreateUserDto } from '../interfaces/dto/create.user.dto';
import debug from 'debug';

const log = debug('simpletest:user_service');

class UsersService implements CRUD {
    async list(limit: number, page: number){
        log('list: %o; not implemented', limit, page);
        return null;
    }

    async create(resource: CreateUserDto){
        log('create: %o', resource);
        return usersDao.addUser(resource);
    }

    async putById(id: string, resource: any){
        log('putById: %o; not implemented', id, resource);
        return 'not implemented';
    }

    async readById(id: string){
        log('readById: %o', id);
        return usersDao.getUserByName(id);
    }

    async deleteById(id: string){
        return usersDao.removeUserByName(id);
    }

    async patchById(id: string, resource: any){
        return 'not implemented';
    }
}

export default new UsersService();