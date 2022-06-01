// import express from "express";
// const app = express();
// const port = 8080;

// app.get('/', (req, res) => res.send('Hello World!'));

// // tslint:disable-next-line:no-console
// app.listen(port, () => console.log(`Server started at http://localhost:${port}!`));

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
