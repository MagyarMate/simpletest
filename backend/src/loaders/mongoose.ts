import mongoose, { ConnectOptions } from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

export default async (): Promise<Db> => {
    const connection = await mongoose.connect(config.databaseURL, {
        useNewUrlParser: true,
       // useCreateIndex: true,
        useUnifiedTopology: true,
        } as ConnectOptions);
        return connection.connection.db;
};