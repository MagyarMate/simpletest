import { NextFunction} from 'express';
import {Router, Request, Response, json} from 'express';
import middleware from '../middleware';

const route = Router();

export default (app: Router) => {
    app.use('/questions', route);

    route.all('/', (req: Request, res: Response, next: NextFunction) => {
        next();
    })
    .get('/', middleware.retrieveQuestion, (req: Request, res: Response) => {
        res.status(200).send('Get question');
    });
}