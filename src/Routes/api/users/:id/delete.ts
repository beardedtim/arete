export default async (ctx: any) => {
  const result = await ctx.useCases.Users.delete_by_id(ctx.params.id, ctx.db, ctx)

  ctx.body = {
    data: result
  }
}