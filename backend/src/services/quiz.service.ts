import { CRUD } from '../interfaces/ICrud';
import QuestionsDao from '../interfaces/dao/questions.dao';
import { RetrieveQuestionDto } from '../interfaces/dto/retrieve.question.dto';
import { UpdateQuestionDto } from '../interfaces/dto/update.question.dto';
import debug from 'debug';

const log = debug('simpletest:quiz_service');

class UsersService implements CRUD {
    async list(limit: number, page: number){
        log('list: %o; not implemented', limit, page);
        return null;
    }

    async create(resource: any){
        log('create: %o; not implemented', resource);
    }

    async putById(id: string, resource: any){
        log('putById: %o; not implemented', id, resource);
        return 'not implemented';
    }

    async readById(id: string){
        log('readById: %o', id);
        return QuestionsDao.getQuestionByNuber(id);
    }

    async deleteById(id: string){
        log('deleteById: %o; not implemented', id);
        return 'not implemented';
    }

    async patchById(id: string, resource: UpdateQuestionDto){
        QuestionsDao.updateQuestionByNumber(id, resource);
        return 'Question updated';
    }
}

export default new UsersService();