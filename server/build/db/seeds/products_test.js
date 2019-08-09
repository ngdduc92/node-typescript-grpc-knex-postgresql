"use strict";
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('products_test').del()
        .then(function () {
        // Inserts seed entries
        return knex('products_test').insert([
            { name: 'pencil', price: '1.99' },
            { name: 'pen', price: '2.99' },
        ]);
    });
};
