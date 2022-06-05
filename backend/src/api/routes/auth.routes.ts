import { Container } from 'typedi';
import { Router, Request, Response, json, NextFunction } from 'express';
import AuthController from '../controller/auth.controller';
import debug from 'debug';


const route = Router();
const log: debug.IDebugger = debug('simpletest:auth_routes');

export default(app: Router) => {
    log('Setup auth routes');
    app.use('/login', route);

    const authController = Container.get('authController') as typeof AuthController;

    route.all('/', (req: Request, res: Response, next: NextFunction) => {
        next();
    })
    .post('/', authController.createToken);
}