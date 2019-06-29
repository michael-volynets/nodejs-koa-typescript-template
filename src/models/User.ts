import Mongoose, { Schema, Document } from "mongoose";
import { BaseSchema, BaseDocument } from "../base/BaseDocument";

export interface IUser extends BaseDocument {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordHash: string;
}

const UserSchema = new BaseSchema({
    email: { type: String,  required: true },
    firstName: { type: String,  required: true },
    lastName: { type: String,  required: true },
    passwordHash: String
});


export default Mongoose.model<IUser>("User", UserSchema);