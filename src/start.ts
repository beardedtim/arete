import DB from '@DB'
import Log from '@Log'
import Env from '@Config/Env'
import Routes from '@Routes'
import Server from '@Server'
import { UseCases } from '@Domains'

import { Server as HTTPServer } from 'http'

const ctx = {
  log: Log,
  db: DB,
  envs: Env,
  useCases: UseCases
}

Log.trace('Creating Server')

const server = Server({ ctx, routes: Routes })

let instance: HTTPServer

process.on('uncaughtException', err => {
  Log.fatal({ err }, 'UNCAUGHT EXCEPTION')
  instance?.close(() => {
    process.exit(1)
  })
})

process.on('unhandledRejection', err => {
  Log.fatal({ err }, 'UNHANDLED REJECTION')
  instance.close(() => {
    process.exit(1)
  })
})

instance = server.listen(Env.port, () => Log.trace('Server Started!'))