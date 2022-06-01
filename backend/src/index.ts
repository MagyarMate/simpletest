import 'reflect-metadata'
import express, {NextFunction} from 'express';
import config from './config';

async function startServer() {
    const app = express();
    await require('./loaders').default({ expressApp: app });

    app.listen( config.port, () => {
        // tslint:disable-next-line:no-console
        console.log(`Server started at http://localhost:${config.port}`);
    }).on('error', err=>{
        process.exit(1);
    });
}

startServer();
