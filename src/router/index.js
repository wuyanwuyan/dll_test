import Router from 'koa-router'
import dlRouter from './dll'

const router = new Router();

dlRouter.prefix('/dll_api')
router.use(dlRouter.routes())

export default router


