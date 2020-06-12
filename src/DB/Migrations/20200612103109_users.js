
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))

    table.string('email')
      .unique()
      .notNullable()

    table.string('password')
      .notNullable()

    table.timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('NOW()'))

    table.timestamp('last_updated')
      .notNullable()
      .defaultTo(knex.raw('NOW()'))
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('users')
};
