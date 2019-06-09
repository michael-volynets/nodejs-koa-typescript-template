import Router from "koa-router";
import Ctrl from "../../controllers";

const router = new Router();

router.get("/", Ctrl.Todos.getMany);
router.get("/:todoId", Ctrl.Todos.get);
router.post("/", Ctrl.Todos.post);
router.put("/:todoId", Ctrl.Todos.put);
router.delete("/:todoId", Ctrl.Todos.deleteOne);

export default router;
