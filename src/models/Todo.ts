import Mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
    name: string;
    date: Date;
    isDone: Boolean;
}

const TodoSchema: Schema = new Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    isDone: { type: Boolean }
});

export default Mongoose.model<ITodo>("Todo", TodoSchema);