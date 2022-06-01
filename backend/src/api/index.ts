import { Router } from 'express';
import user from './routes/user';
import question from './routes/question';

export default () => {
    const app = Router();
    user(app);
    question(app);

    return app;
};
