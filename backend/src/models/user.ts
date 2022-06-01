import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            index: true
    },
    password: String,
},
{timestamps:true},
);

export default mongoose.model<IUser & mongoose.Document>('User', User);
