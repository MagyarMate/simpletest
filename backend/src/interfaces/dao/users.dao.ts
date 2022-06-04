import { CreateUserDto } from '../dto/create.user.dto';
import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:question_dao');

class UsersDAO {
    private readonly userModel: mongoose.Model<IUser & mongoose.Document>;

    constructor() {
        log('UsersDAO created');
        this.userModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;

    }

    async addUser(user: CreateUserDto): Promise<string> {
        log('addUser: %o', user);
        const userRecord = await this.userModel.create({username: user.username, password: user.password});
        return userRecord._id.toString();
    }

    async getUserByName(username: string): Promise<IUser|null> {
        log('getUserByName: %o', username);
        try{
            const userRecord = await this.userModel.findOne({username});
            return userRecord as IUser;
        } catch(err){
            log('getUserByName: %o', err);
            return null;
        }
    }

    async removeUserByName(username: string): Promise<string> {
        log('removeUserByName: %o', username);
        await this.userModel.deleteOne({username});
        return 'user deleted';
    }

}

export default new UsersDAO();