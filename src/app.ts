import Koa from "koa";
import Serve from "koa-static";
import KoaPassport from "koa-passport";
import Path from "path";
import Mongoose from "mongoose";
import Environment from "./config/environment";
import BodyParser from "koa-bodyparser";
import Router from "./routes";
import ErrorMiddleware from "./middleware/error.middleware";
import KoaResponseTime from "koa-response-time";

const app = new Koa();

app.use(BodyParser());
app.use(Serve(Path.resolve(__dirname, "static")));

app.use(KoaResponseTime()); // To know time elapsed, when request entered and until the server sent a response

Mongoose.connect(Environment.mongoConnectionString, { useNewUrlParser: true });

// General Exception Handler
app.use(ErrorMiddleware());

app.use(KoaPassport.initialize());

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