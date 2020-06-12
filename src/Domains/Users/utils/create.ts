import bcrypt from 'bcrypt'
import Knex from 'knex'
import safe_keys from './safeKeys'

interface NewUser {
  email: string
  password: string
}

export default async (user: NewUser, db: Knex) => {
  user.password = await bcrypt.hash(user.password, 10)

  const [result] = await db
    .into('users')
    .insert(user)
    .returning([...safe_keys])

  return result
}