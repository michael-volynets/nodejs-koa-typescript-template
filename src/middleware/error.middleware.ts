import { ParameterizedContext } from "koa";
import { ApiError } from "../base/APIError";

export default () => async (ctx: ParameterizedContext<any, {}>, next: () => Promise<any>) => {
        try {
            await next();
        } catch (error) {
            ctx.type = "application/json";

            if (error instanceof ApiError) {
                ctx.status = error.statusCode;
            } else {
                ctx.status = 500;
            }

            ctx.body = {
                message: error.message
            };
            ctx.app.emit("error", error, ctx);
        }
    };

