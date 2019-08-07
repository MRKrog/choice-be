exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('orders', function(table) {
      table.increments('id').primary();
      table.integer('number');
    }),

    knex.schema.createTable('notes', function(table) {
      table.increments('id').primary();
      table.string('title');
      table.string('copy');
      table.integer('status');
      table.integer('order_id').unsigned()
        .references('orders.id');
    }),
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('notes'),
  ]);
};
