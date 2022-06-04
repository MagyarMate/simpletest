import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:quiz_middleware');

class QuizMiddleware{
    constructor(){
        log('QuizMiddleware created');
    }
}

export default new QuizMiddleware();