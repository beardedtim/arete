import Knex from 'knex'

export const migrate = (db: Knex) => db.migrate.latest()

export const rollback = (db: Knex, all = false) => db.migrate.rollback(undefined, all)

export const seed = (db: Knex) => db.seed.run()