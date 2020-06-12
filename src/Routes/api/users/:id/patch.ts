export default async (ctx: any) => {
  const result = await ctx.useCases.Users.update_user(ctx.params.id, ctx.request.body, ctx.db, ctx)

  ctx.body = {
    data: result
  }
}