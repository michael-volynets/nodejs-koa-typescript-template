import { BaseDocument } from "../base/BaseDocument";
import { prop } from "typegoose";
import Bcrypt from "bcrypt";

export class User extends BaseDocument {
    @prop({ required: true, unique: true })
    email: string;
    @prop({ required: true })
    firstName: string;
    @prop({ required: true })
    lastName: string;
    @prop()
    passwordHash: string;
}

export default new User().getModelForClass(User);