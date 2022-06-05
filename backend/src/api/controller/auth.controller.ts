import {Request, Response, NextFunction} from 'express';
import authService from '../../services/auth.service';
import { IUserAuth } from '../../interfaces/IUserAuth';
import argon2 from 'argon2'
import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:auth_controller');
export class AuthController{
    async createToken(req: Request, res: Response){
        const token = await authService.create_token(req.body.username, req.body.password);
        if(!token){
            return res.status(401).send('Invalid credentials');
        }
        return res.status(200).json(token);
    }

    async verifyUser(req: Request, res: Response, next: NextFunction){
        try{
            const token = req.headers.authorization?.split(' ')[1];

            if (!token){
                return res.status(401).send('Invalid token');
            }

            const decoded: IUserAuth = await authService.verify_token(token);
            req.body.currentUser = decoded.username;
            next();
        }catch(err){
            if(err){
                res.status(401).send('Expired token');
                return
            }
            res.status(500).send('Internal server error');
        }
    }
}

export default new AuthController();