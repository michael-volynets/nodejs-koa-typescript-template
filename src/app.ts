import Koa from "koa";
import Router from "koa-router";
import Serve from "koa-static";
import path from "path";

const app = new Koa();
const router = new Router();

app.use(Serve(path.resolve(__dirname, 'static')));

router.get('/', ctx => {
    ctx.body = "<h1>Hello World!</h1>"
});

app.use(router.routes());  

export default app;