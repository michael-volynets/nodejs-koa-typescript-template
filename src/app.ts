import Koa from "koa";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get('/', ctx => {
    ctx.body = "<h1>Hello World!</h1>"
});

app.use(router.routes());  

export default app;