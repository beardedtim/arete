import bcrypt from 'bcrypt'
import * as R from 'ramda'
import Knex from 'knex'
import safe_keys from './safeKeys'

export default async (id: string, update: { email?: string, password?: string, meta?: {} }, db: Knex) => {
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10)
  }

  if (update.meta) {
    const { meta: oldMeta } = await db.from('users').select('meta').where({ id }).first()
    const newMeta = R.mergeDeepRight(oldMeta, update.meta)
    update.meta = newMeta
  }

  const [result] = await db.from('users').where({ id }).update({
    ...update,
    last_updated: new Date().toISOString(),
  }).returning([...safe_keys])

  return result
}