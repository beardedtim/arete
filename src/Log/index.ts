import pino from 'pino'
import Env from '@Config/Env'

export default pino({
  name: Env.name,
  level: Env.log_level,
  prettyPrint: Env.is_production ? undefined : {
    levelFirst: true
  },
  serializers: pino.stdSerializers,
  // Ensure that we NEVER log anything called password
  // LIKE EVER
  redact: [
    'password',
    '*.password'
  ]
})
