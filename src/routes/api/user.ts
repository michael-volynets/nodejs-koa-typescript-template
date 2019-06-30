import Router from "koa-router";
import Ctrl from "../../controllers";

const router = new Router();

router.post("/", Ctrl.Users.post);
router.get("/", Ctrl.Users.get);

export default router;