export default async (ctx: any) => {
  const result = await ctx.useCases.Datastore.migrate(ctx.db)

  ctx.body = {
    data: result
  }
}