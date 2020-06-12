import { InputError, DuplicateEntryDBError, DBError, AuthenticationError } from '@Errors'
import Env from '@Config/Env'

import create_user from './utils/create'
import list_users from './utils/list'
import by_email from './utils/byEmail'
import by_id from './utils/byID'

import passwords_match from './utils/passwordsMatch'
import update_by_id from './utils/updateById'

import new_user_schema from './schemas/new'
import user_return_type from './schemas/return'

import Knex from 'knex'
import { validate } from 'jsonschema'
import { sign, verify } from 'jsonwebtoken'

/**
 * Creates a new User
 */
export const create = async (user: any, db: Knex, ctx: any) => {
  const valid = await validate(user, new_user_schema)

  if (valid.errors.length) {
    throw new InputError(valid.errors)
  }

  ctx.log.trace({ user }, 'I am creating a user!')

  try {
    const result = await create_user(user, db)

    ctx.log.trace({ user: result }, 'Created User')

    return result
  } catch (e) {
    if (DuplicateEntryDBError.isDuplicateError(e.message)) {
      throw new DuplicateEntryDBError(e.message)
    }

    throw new DBError()
  }
}


/**
 * Lists known users
 */
export const list = async (query: any, db: Knex, ctx: any) => {
  try {
    const result = await list_users(query, db)

    const result_mapped = result.map(({ created_at, last_updated, ...rest }) => ({
      ...rest,
      created_at: created_at?.toISOString(),
      last_updated: last_updated?.toISOString(),
    }))

    const valid = await validate(result_mapped, {
      type: 'array',
      items: user_return_type
    })

    if (valid.errors.length) {
      ctx.log.error({ errors: valid.errors }, 'Ouput did not match schema')
    }

    return result

  } catch (e) {
    throw new DBError()
  }
}


/**
 * Validates Password matches DB
 */
export const validate_password = async ({ email, password }: { email: string, password: string }, db: Knex) => {
  const user = await by_email(email, db).select(['password'])

  return passwords_match(password, user.password)
}

/**
 * Creates JWT given a user's Email
 */
export const create_jwt = async ({ email }: { email: string }, db: Knex) => {
  const user = await by_email(email, db)

  return sign(user, Env.jwt_secret, { expiresIn: '1hr' })
}

/**
 * Verifies a JWT is valid, signed, and not expired
 */
export const verify_jwt = async (token: string) => verify(token, Env.jwt_secret)

/**
 * Updates a user's Email, Password, or Meta along with the Last Updated field 
 */
export const update_user = async (id: string, update: any, db: Knex, ctx: any) => {
  // If there is no user, they cannot do this
  if (!ctx.user) {
    ctx.log.warn(update, 'Unauthenticated User trying to update user by ID')
    throw new AuthenticationError()
  }

  // If the user that is trying to update is not the
  // user that is being updated, they cannot do this
  if (ctx.user.id !== id) {
    throw new AuthenticationError()
  }

  return update_by_id(id, update, db)
}

export const get_by_id = by_id

export const delete_by_id = async (id: string, db: Knex, ctx: any) => {
  // If there is no user or the user is not the
  // user that is trying to delete itself
  if (!ctx.user || ctx.user.id !== id) {
    throw new AuthenticationError()
  }

  const [result] = await db.from('users').where({ id }).delete().returning(['id', 'email', 'meta'])

  return result
}