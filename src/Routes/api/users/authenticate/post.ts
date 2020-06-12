import { PasswordMismatchError } from '@Errors'

import Env from '@Config/Env'

export default async (ctx: any) => {
  const result = await ctx.useCases.Users.validate_password(ctx.request.body, ctx.db, ctx)

  if (!result) {
    throw new PasswordMismatchError()
  }

  const token = await ctx.useCases.Users.create_jwt(ctx.request.body, ctx.db, ctx)

  ctx.cookies.set(Env.cookie_key, token, { signed: true })

  ctx.body = {
    data: {
      token
    }
  }
}