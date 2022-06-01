import {Request, Response, NextFunction} from 'express';
import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '../../interfaces/IUser';

const retrieveUser = async (req: Request, res: Response, next: NextFunction) => {
        try{
        const userModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
        const userName = req.query.username;
        if (userName) {
            const userRecord = await userModel.findOne({username: userName.toString()});
            if (!userRecord){
                res.status(404).send('User not found');
            }
            return res.status(200).send(userRecord);
        }
        return next();
    } catch (e){
        return next(e);
    }
}

export default retrieveUser;