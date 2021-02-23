const Koa = require('koa')
const KoaRouter = require('koa-router')
const VersionController = require('./controller/version')
const app = new Koa()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

const router = new KoaRouter()

// Routes


router.post(`/version`, async (ctx) => {
  const userInfo = ctx.request.body
})

app.use(router.allowedMethods()).use(router.routes());

// don't forget to export!
module.exports = app
