import 'reflect-metadata'
import express, {NextFunction} from 'express';
import config from './config';
import debug from 'debug';

const log: debug.IDebugger = debug('simpletest:app');
async function startServer() {
    log('Starting server...');
    const app = express();
    log('Loading application...');
    await require('./loaders').default({ expressApp: app });
    log('Start listening');

    app.listen( config.port, () => {
        log('Server started at http://localhost:%o', config.port);
    }).on('error', err=>{
        process.exit(1);
    });
}

startServer();
