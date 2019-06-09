import Router from "koa-router";
import Todo from "./todo";
import User from "./user";

const router = new Router();

router.use('/todo', Todo.routes());
router.use('/user', User.routes());

export default router;