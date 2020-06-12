import getenv from 'getenv'

const envs = {
  is_production: getenv.string('NODE_ENV', 'development') === 'production',
  port: getenv.int('PORT'),
  name: getenv.string('NAME', '__UNKNOWN__'),
  log_level: getenv.string('LOG_LEVEL', 'error'),
  jwt_secret: getenv.string('JWT_SECRET'),
  cookie_secret: getenv.string('COOKIE_SECRET'),
  cookie_key: getenv.string('COOKIE_KEY')
}

export type Env = typeof envs;

export default envs