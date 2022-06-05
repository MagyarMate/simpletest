import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:auth_middleware');

class AuthMiddleware{
    verifyToken(req: Request, res: Response, next: NextFunction){

        const bearerHeader = req.headers.authorization;
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.body.token = bearerToken;
            next();
        }else{
            res.sendStatus(403);
        }
    }
}

export default new AuthMiddleware();