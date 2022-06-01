import { NextFunction} from 'express';
import {Router, Request, Response, json} from 'express';
import middleware from '../middleware';

const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    route.all('/', (req: Request, res: Response, next: NextFunction) => {
        next();
    });

    route.get('/', middleware.retrieveUser, (req: Request, res: Response) => {
        res.status(200).send('Get user');
    });
}