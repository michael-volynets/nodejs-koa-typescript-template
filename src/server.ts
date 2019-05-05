import * as Koa from "koa";
import * as Router from "koa-router";

const port = process.env.PORT || 3000;

const app = new Koa();
const router = new Router();

router.get('/', ctx => {
    ctx.body = "<h1>Hello World!</h1>"
});

app.use(router.routes());  

app.listen(port);
