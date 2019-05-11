import Router from "koa-router";
import Todo from "./todo";

const router = new Router();

router.use('/todo', Todo.routes());

export default router;