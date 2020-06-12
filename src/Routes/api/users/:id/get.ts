export default async (ctx: any) => {
  const { keys = ['*'] } = ctx.query

  const result = await ctx.useCases.Users.get_by_id(ctx.params.id, keys, ctx.db, ctx)

  ctx.body = {
    data: result
  }
}