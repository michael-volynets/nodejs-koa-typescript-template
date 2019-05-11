import Koa from "koa";
import Serve from "koa-static";
import Path from "path";
import Mongoose from "mongoose";
import Environment from "./config/environment";
import BodyParser from "koa-bodyparser";
import Router from "./routes";

const app = new Koa();

app.use(BodyParser());
app.use(Serve(Path.resolve(__dirname, 'static')));

Mongoose.connect(Environment.mongoConnectionString, { useNewUrlParser: true });

if (Environment.isDevelopment()) {
    Mongoose.set('debug', true);
}

app.use(Router.routes());

export default app;