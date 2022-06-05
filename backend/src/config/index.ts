import dotenv from 'dotenv';

dotenv.config();

export default{
    applicationName: process.env.APPLICATION_NAME,
    nodeEnv: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
    databaseURL: 'mongodb://' + process.env.MONGO_URI + '/' + process.env.APPLICATION_NAME,
    secret: String(process.env.TOKEN_SECRET),
    api:{
        prefix: String(process.env.API_PREFIX),
    }
};