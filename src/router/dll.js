// /router.js
import Router from 'koa-router'
const router = new Router
import dllController from '../controller/dll'

router.post('/authorization', dllController.authorization)
    .post('/business_handle', dllController.changeData)
    .post('/read_cardnum', dllController.read_cardnum)
    .post('/read_cardnum_and_name', dllController.read_cardnum_and_name)

export default router
