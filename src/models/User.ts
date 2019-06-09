import Mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string,
    firstName: string;
    lastName: string;
    passwordHash: string;
}

const UserSchema = new Schema({
    email: { type: String,  required: true },
    firstName: { type: String,  required: true },
    lastName: { type: String,  required: true },
    passwordHash: String
}, { timestamps: true });

export default Mongoose.model<IUser>('User', UserSchema);