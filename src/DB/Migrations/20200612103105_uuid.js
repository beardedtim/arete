
exports.up = function (knex) {
  return knex.schema.raw('CREATE EXTENSION "uuid-ossp"')
};

exports.down = function (knex) {
  return knex.schema.raw('DROP EXTENSION "uuid-ossp"')
};
