import { Container } from 'typedi';
import { NextFunction} from 'express';
import {Router, Request, Response, json} from 'express';
import UsersController from '../controller/users.controller';
import usersMiddleware from '../middleware/users.middleware';
import debug from 'debug';

const route = Router();
const log: debug.IDebugger = debug('simpletest:user_routes');

export default (app: Router) => {
    log('Setup users routes');
    app.use('/users', route);

    const usersController = Container.get('userController') as typeof UsersController;

    route.all('/', (req: Request, res: Response, next: NextFunction) => {
        next();
    })
    .get('/', usersMiddleware.validateUserName, usersController.getUserByName)
    .post('/', usersMiddleware.validateRequiredUserBodyFields, usersController.checkUserDuplication, usersController.createUser)
    .delete('/', usersMiddleware.validateUserName, usersController.removeUserByName);
}