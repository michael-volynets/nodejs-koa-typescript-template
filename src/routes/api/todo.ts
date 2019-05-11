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

const getTodos = async (ctx: RouterContext) => {
    let skip = 0;
    let limit = 20;

    if (ctx.request.query.skip) {
        const parsed = Number.parseInt(ctx.request.query.skip);

        if (typeof parsed === 'number') {
            skip = parsed;
        }
    }

    if (ctx.request.query.limit) {
        const parsed = Number.parseInt(ctx.request.query.limit);

        if (typeof parsed === 'number') {
            limit = parsed;
        }
    }
    
    ctx.body = await Todo
        .find()
        .skip(skip)
        .limit(limit);
};

const getTodo = async (ctx: RouterContext) => {
    const todoId = ctx.params.todoId;

   ctx.body = await Todo.findById(todoId);

   if (!ctx.body) {
       ctx.status = 404;
   }
};

const updateTodo = async (ctx: RouterContext) => {
    const todoId = ctx.params.todoId;

    await Todo.updateOne({
        _id: todoId
    }, ctx.request.body);

    ctx.status = 200;
};

const deleteTodo =  async (ctx: RouterContext) => {
    const todoId = ctx.params.todoId;

    await Todo.deleteOne({
        _id: todoId
    });

    ctx.status = 200;
};

// Routes

router.get("/", getTodos);
router.get("/:todoId", getTodo);
router.post("/", createTodo);
router.put("/:todoId", updateTodo);
router.delete("/:todoId", deleteTodo);

export default router;
