import glob from 'glob'
import Router from '@koa/router'

const ROUTES_PATH = __dirname
// What HTTP methods we want to expose
const methods = ['get', 'post', 'patch', 'delete']
type PossibleMethods =
  | 'get'
  | 'post'
  | 'patch'
  | 'delete'

// What Glob pattern we want to match on
const pattern = `+(${methods.join('|')})`
// The matching files
const routes = glob.sync(`${ROUTES_PATH}/**/${pattern}.ts`)

const get_method_from_path = (path: string): PossibleMethods => {
  const split = path.split('/')
  const last = split.pop()

  // @ts-ignore
  return last?.slice(0, -3)
}

const get_path_from_path = (path: string) => {
  const without_routes_path = path.replace(ROUTES_PATH, '')
  const split = without_routes_path.split('/')

  split.pop()

  return split.join('/')
}

const get_handler_from_path = (path: string) => {
  const mod = require(path)

  return mod.handler ?? mod.default
}

export default routes.reduce((router, route_path) => {
  const method = get_method_from_path(route_path)
  const path = get_path_from_path(route_path)
  const handler = get_handler_from_path(route_path)

  router[method](path, handler)

  return router
}, new Router())