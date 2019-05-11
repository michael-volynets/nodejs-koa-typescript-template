import Router from "koa-router";
import Api from "./api";

const router = new Router();

router.use('/api', Api.routes());

export default router;