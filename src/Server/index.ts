import Envs, { Env } from '@Config/Env'
import Router from '@koa/router'
import Middlware from './Middleware'

import Koa from 'koa'
import Knex from 'knex'

import { Logger } from 'pino'

interface ServerContext {
  db: Knex,
  log: Logger,
  envs: Env,
  useCases: any
}

export default ({ ctx, routes }: { ctx: ServerContext, routes: Router }) => {
  const app = new Koa<any, ServerContext>()

  // Apply context
  for (const [key, value] of Object.entries(ctx)) {
    app.context[key as keyof ServerContext] = value
  }

  // Apply keys for signing cookies
  app.keys = [Envs.cookie_secret]

  // Apply global middleware
  Middlware(app)

  // Apply routes
  app
    .use(routes.routes())
    .use(routes.allowedMethods());

  return app
}