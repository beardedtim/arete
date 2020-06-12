import Knex from "knex";
import get_only_safe_keys from './getOnlySafeKeys'

interface ListQuery {
  limit: number
  offset: number
  sort_ord: 'DESC' | 'ASC',
  sort_col: string,
  keys: string[]
}

export default (query: ListQuery, db: Knex) => {
  const allowed_keys = get_only_safe_keys(query.keys)

  return db.from('users')
    .select(allowed_keys)
    .limit(query.limit)
    .offset(query.offset)
    .orderBy(query.sort_col, query.sort_ord)
}