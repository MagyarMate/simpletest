import {Request, Response, NextFunction} from 'express';
import usersService from '../../services/users.service';
import argon2 from 'argon2'
import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:user_controller');
export class UsersController{
    async createUser(req: Request, res: Response){
        req.body.password = await argon2.hash(req.body.password);
        const user = await usersService.create(req.body);
        return res.status(200).send(user);
    }

    async getUserByName(req: Request, res: Response){
        log(req.body);
        const user = await usersService.readById(req.body.username?.toString() as string);
        if(!user){
            return res.status(404).send('User not found');
        }
        return res.status(200).send(user);
    }

    async removeUserByName(req: Request, res: Response){
        const deleteResponse = await usersService.deleteById(req.body.username?.toString() as string);
        return res.status(200).send(deleteResponse);
    }

    async checkUserDuplication(req: Request, res: Response, next: NextFunction){
        try{
            const user = await usersService.readById(req.body.username?.toString() as string);
            if(user){
                return res.status(409).send('User already exists');
            }
        return next();
        }catch(err){
            return next(err);
        }
    }

}

export default new UsersController();