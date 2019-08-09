
exports.up = function(knex, Promise) {
    return knex.schema.createTable('products_test', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('price').notNullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products_test');
};
