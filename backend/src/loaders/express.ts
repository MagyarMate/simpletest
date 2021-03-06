import express from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config';

export default ({ app }: { app: express.Application }) => {
    app.get('/status', (req, res) => {
        res.status(200).end();
    });

    app.head('/status', (req, res) => {
        res.status(200).end();
    });

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(config.api.prefix, routes());

    app.get('/', (req, res) => {
        res.send('Simple Test Back-end');
    });
}
