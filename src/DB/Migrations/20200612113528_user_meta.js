const { table } = require("console");

exports.up = function (knex) {
  return knex.schema.table('users', table => {
    table.jsonb('meta')
      .defaultTo('{}')
      .comment('This is a JSON Blob of metadata you can attach to a user')
  })
};

exports.down = function (knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('meta')
  })
};
