import Router, { RouterContext } from "koa-router";
import UserService from "../../services/user.service";
import { ApiError } from "../../base/APIError";

const router = new Router();

const createUser = async (ctx: RouterContext) => {
    const result = await UserService.createUser(ctx.request.body);

    ctx.body = result;
}

router.post('/', createUser);

export default router;