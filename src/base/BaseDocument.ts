import Mongoose from "mongoose";
import { Typegoose, pre, prop, GetModelForClassOptions } from "typegoose";
import { ObjectId } from "bson";

@pre<BaseDocument>("save", function(next) {
    if (typeof this.isDocumentDeleted === "undefined") {
        this.isDocumentDeleted = false;
    }
    next();
})
export class BaseDocument extends Typegoose {
    @prop()
    _id: ObjectId;
    @prop()
    createdAt?: Date;
    @prop()
    updatedAt?: Date;
    @prop()
    isDocumentDeleted?: boolean;

    constructor() {
        super();
        this.setModelForClass(this, { schemaOptions: { timestamps: true} });
    }
}