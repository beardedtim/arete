export default async (ctx: any) => {
  const result = await ctx.useCases.Datastore.rollback(ctx.db, ctx.query.all)

  ctx.body = {
    data: result
  }
}