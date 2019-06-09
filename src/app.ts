import Koa from "koa";
import Serve from "koa-static";
import Path from "path";
import Mongoose from "mongoose";
import Environment from "./config/environment";
import BodyParser from "koa-bodyparser";
import Router from "./routes";
import { ApiError } from "./base/APIError";

const app = new Koa();

app.use(BodyParser());
app.use(Serve(Path.resolve(__dirname, 'static')));

Mongoose.connect(Environment.mongoConnectionString, { useNewUrlParser: true });

// General Exception Handler
app.use(async (ctx, next) => {
    try {
        await next();
    } catch(err) {
        if (err instanceof ApiError) {
            ctx.status = err.statusCode;
        } else {
            ctx.status = 500;
        }
        ctx.body = err.message + '\n';
        ctx.app.emit('error', err, ctx);
    }
});

if (Environment.isDevelopment()) {
    Mongoose.set('debug', true);

    // Show Stack trace
    app.on('error', (err, ctx) => {
        ctx.body += 'Stack Trace:\n' + err.stack;
    });
}

app.use(Router.routes());

export default app;