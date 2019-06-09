import Koa from "koa";
import Serve from "koa-static";
import Path from "path";
import Mongoose from "mongoose";
import Environment from "./config/environment";
import BodyParser from "koa-bodyparser";
import Router from "./routes";
import ErrorMiddleware from "./middleware/error.middleware";

const app = new Koa();

app.use(BodyParser());
app.use(Serve(Path.resolve(__dirname, "static")));

Mongoose.connect(Environment.mongoConnectionString, { useNewUrlParser: true });

// General Exception Handler
app.use(ErrorMiddleware.middleware);

if (Environment.isDevelopment()) {
    Mongoose.set("debug", true);

    // Show Stack Trace if it"s "development" mode.
    app.on("error", (err, ctx) => {
        if (err.stack) {
            ctx.body.stack = err.stack;
        }
    });
}

app.use(Router.routes());

export default app;