export default async (ctx: any) => {
  const result = await ctx.useCases.Users.create(ctx.request.body, ctx.db, ctx)

  ctx.body = {
    data: result
  }
}