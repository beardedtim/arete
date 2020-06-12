export default async (ctx: any) => {
  const {
    limit = 100,
    offset = 0,
    sort_ord = 'DESC',
    sort_col = 'last_updated',
    keys = ['*']
  } = ctx.query

  const result = await ctx.useCases
    .Users
    .list({ limit, offset, sort_ord, sort_col, keys }, ctx.db, ctx)

  ctx.body = {
    data: result
  }
}