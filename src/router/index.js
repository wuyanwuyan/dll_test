import fs from 'fs'
import path from 'path'
import Router from 'koa-router'

const router = new Router();

const basename = path.basename(__filename)

fs.readdirSync(__dirname).forEach(file => {
    if(file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js') {
        let subRoutes = require(path.join(__dirname, file)).default
        subRoutes.prefix('/dll_api')
        router.use(subRoutes.routes())
    }
})

export default router


