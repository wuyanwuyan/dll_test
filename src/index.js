import Koa from 'koa'
import path from 'path'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import errorHandle from "./middleware/errorHandle";
import router from './router'
// import koaStatic from 'koa-static'
import fs from 'fs'

const app = new Koa()

app.use(errorHandle);

// app.use(koaStatic(path.join( __dirname, './dist'), {
//   gzip: false
// }));

app.use(cors())
app.use(koaBody({ multipart: true }))

app.use(router.routes())

const port = 9752
app.listen(port, () => {
  console.log(`服务已启动，请打开下面链接访问: http://localhost:${port}`)
})

const errHandle = err => {
    console.error('有一个未捕获的错误', err, err.message)
    fs.appendFileSync(path.resolve(process.cwd(), './log.txt'), `${new Date()}：${err.toString()}，${err.message} \n`);
    process.exit(1) //强制性的（根据 Node.js 文档）
}

process.on('uncaughtException', errHandle)


process.on('unhandledRejection', errHandle)

setInterval(() => {
    console.log(new Date())
}, 3000)