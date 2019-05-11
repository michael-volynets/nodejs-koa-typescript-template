import Mongoose from "mongoose";
import Router, { RouterContext } from "koa-router";
import Todo, { ITodo } from "../../models/todo";

const router = new Router();

// Methods

const createTodo = async (ctx: RouterContext) => {
    const todo = new Todo(ctx.request.body);
    const result = await todo.save();

    ctx.body = result;
};

// Routes

router.post("/",createTodo)

export default router;
