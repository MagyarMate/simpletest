import { Router } from 'express';
import userRoutes from './routes/user.routes';
import quizRoutes from './routes/quiz.routes';
import authRoutes from './routes/auth.routes';

export default () => {
    const app = Router();
    userRoutes(app);
    authRoutes(app);
    quizRoutes(app);

    return app;
};
