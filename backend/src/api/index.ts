import { Router } from 'express';
import userRoutes from './routes/user.routes';
import quizRoutes from './routes/quiz.routes';

export default () => {
    const app = Router();
    userRoutes(app);
    quizRoutes(app);

    return app;
};
