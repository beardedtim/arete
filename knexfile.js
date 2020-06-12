// Ensure you have the ENV set before trying to use this
module.exports = {
  client: 'postgresql',
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  },
  migrations: {
    directory: 'src/DB/Migrations'
  },
  seeds: {
    directory: 'src/DB/Seeds'
  }
}
