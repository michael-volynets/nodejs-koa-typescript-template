import { RouterContext } from "koa-router";
import Todo, { ITodo } from "../models/todo";

const post = async (ctx: RouterContext) => {
    const todo = new Todo(ctx.request.body);
    const result = await todo.save();

    ctx.body = result;
};

const getMany = async (ctx: RouterContext) => {
    let skip = 0;
    let limit = 20;

    if (ctx.request.query.skip) {
        const parsed = Number.parseInt(ctx.request.query.skip);

        if (typeof parsed === "number") {
            skip = parsed;
        }
    }

    if (ctx.request.query.limit) {
        const parsed = Number.parseInt(ctx.request.query.limit);

        if (typeof parsed === "number") {
            limit = parsed;
        }
    }

    ctx.body = await Todo
        .find()
        .skip(skip)
        .limit(limit);
};

const get = async (ctx: RouterContext) => {
    const todoId = ctx.params.todoId;

   ctx.body = await Todo.findById(todoId);

   if (!ctx.body) {
       ctx.status = 404;
   }
};

const put = async (ctx: RouterContext) => {
    const todoId = ctx.params.todoId;

    await Todo.updateOne({
        _id: todoId
    }, ctx.request.body);

    ctx.status = 200;
};

const deleteOne =  async (ctx: RouterContext) => {
    const todoId = ctx.params.todoId;

    await Todo.deleteOne({
        _id: todoId
    });

    ctx.status = 200;
};

export default {
    post,
    get,
    getMany,
    put,
    deleteOne
};
