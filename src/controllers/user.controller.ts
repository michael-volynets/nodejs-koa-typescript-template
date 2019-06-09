import { RouterContext } from "koa-router";
import userService from "../services/user.service";

const post = async (ctx: RouterContext) => {
    const result = await userService.createUser(ctx.request.body);

    ctx.body = result;
}

export default {
    post
}