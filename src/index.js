import Koa from 'koa'
import path from 'path'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import errorHandle from "./middleware/errorHandle";
import router from './router'
import koaStatic from 'koa-static'

const app = new Koa()

app.use(errorHandle);

app.use(koaStatic(path.join( __dirname, './dist'), {
  gzip: false
}));

app.use(cors())
app.use(koaBody({ multipart: true }))

app.use(router.routes())

const port = 9752
app.listen(port, () => {
  console.log(`服务已启动，请打开下面链接访问: \nhttp://127.0.0.1:${port}`)
})
