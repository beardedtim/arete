import Knex from "knex";
import get_only_safe_keys from './getOnlySafeKeys'

export default (id: string, keys: string[], db: Knex) => {
  return db
    .from('users')
    .where({ id })
    .select(get_only_safe_keys(keys))
    .first()
}