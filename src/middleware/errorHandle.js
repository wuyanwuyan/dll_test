import {resReturn} from "../lib/utils";

export default async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = resReturn(null, ctx.status, err.message);
        ctx.app.emit('error', err, ctx);
    }
}