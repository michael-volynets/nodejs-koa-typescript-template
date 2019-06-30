import { RouterContext } from "koa-router";
import userService from "../services/user.service";

const post = async (ctx: RouterContext) => {
    const result = await userService.createUser(ctx.request.body);

    ctx.body = result;
};

const get = async(ctx: RouterContext) => {
    const result = await userService.getUsers(Number(ctx.query.skip), Number(ctx.query.limit));

    ctx.body = result;
};

export default {
    post,
    get
};