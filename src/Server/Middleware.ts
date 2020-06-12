import Koa from "koa"
import body_parser from 'koa-bodyparser'
import Env from '@Config/Env'
import { verify_jwt } from '@Domains/Users/UseCases'

const log_errors: Koa.Middleware = async (ctx, next) => {
  try {
    // try to do the next thing without errors
    await next()
  } catch (e) {
    // log errors if caught
    ctx.log.error({ err: e }, 'Error in response')
    throw e
  }
}

const catch_errors: Koa.Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    const message = err.message || 'INTERNAL SERVER ERROR'
    const code = err.code > 99 && err.code < 600 ? err.code : 500
    const errors = err.errors || [{ message }]
    const original_body = ctx.body

    ctx.status = code
    ctx.body = {
      message,
      code,
      errors,
      original_body
    }
  }
}

const response_time: Koa.Middleware = async (ctx, next) => {
  const start = process.hrtime()
  await next()
  const end = process.hrtime(start)

  ctx.set('X-Resp-Time', end.reduce((sec, nano) => sec * 1e9 + nano) + 'ms');
}

const jwt_transform: Koa.Middleware = async (ctx, next) => {
  if (!ctx.get('Authorization') && !ctx.cookies.get(Env.cookie_key)) {
    return next()
  }
  const token = ctx.get('Authorization').replace('Bearer ', '') || ctx.cookies.get(Env.cookie_key)

  const data = await verify_jwt(token || '')

  ctx.user = data

  return next()
}

export default (app: Koa<any, any>) => app
  .use(catch_errors)
  .use(log_errors)
  .use(body_parser())
  .use(response_time)
  .use(jwt_transform)