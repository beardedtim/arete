import Knex from "knex";
import safe_keys from './safeKeys'

export default (email: string, db: Knex) => db
  .from('users')
  .where({ email })
  .select([...safe_keys])
  .first()