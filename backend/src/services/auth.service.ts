import usersDao from '../interfaces/dao/users.dao';
import argon2 from 'argon2'
import { IUser } from '../interfaces/IUser';
import { IUserAuth } from '../interfaces/IUserAuth';
import jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import config from '../config';

import debug from 'debug';
const log: debug.IDebugger = debug('simpletest:auth_service');

class AuthService{

    async create_token(userName: string, password: string): Promise<string|null>{
        log('readById: %o', userName);
        const userFromDb = await usersDao.getUserByName(userName) as unknown as IUser;

        // Check if user exists in db
        if(!userFromDb){
            return null;
        }

        if(!userFromDb.password){
            return null;
        }

        // Check if password is correct
        const isPasswordCorrect = await argon2.verify(userFromDb.password, password);
        const payload = { username: userName} as IUserAuth;
        if(isPasswordCorrect){
            const SignInOptions : SignOptions = {
                algorithm: 'HS256',
                expiresIn: '1h'
            }
            return jwt.sign(payload, config.secret as string, SignInOptions);
        }

        return null;
    }

    verify_token(token: string): Promise<IUserAuth>{ // Todo create interface for token
        const secret = config.secret;
        const verifyOptions: jwt.VerifyOptions = {
            algorithms: ['HS256']
        }
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, verifyOptions, (err, decoded) => {
                if(err) return reject(err);
                resolve(decoded as IUserAuth);
            });
        });
    };

}

export default new AuthService();