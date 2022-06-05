import {Request, Response, NextFunction} from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:user_middleware');

class UsersMiddleware{

    async validateRequiredUserBodyFields(req: Request, res: Response, next: NextFunction){
        if(req.body && req.body.username && req.body.password){
            return next();
        } else {
            res.status(400).send('Missing required fields');
        }
    }

    async validateUserName(req: Request, res: Response, next: NextFunction){
        if(req.body && req.body.username || req.query && req.query.username){
            return next();
        } else {
            res.status(400).send('Missing required fields');
        }
    }

    async extractUserName(req: Request, res: Response, next: NextFunction){
        if(req.query.username){
            req.body.username = req.query.username;
        }
    }
}

export default new UsersMiddleware();