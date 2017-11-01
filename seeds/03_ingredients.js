'use strict'

exports.seed = (knex, Promise) => {
  return Promise.all([
    // Inserts seed entries
    knex('ingredients').insert({ id: 1, name: 'bourbon', amount: 2.0, unit: 'ounce' }),
    knex('ingredients').insert({ id: 2, name: 'simple syrup', amount: 0.25, unit: 'ounce' }),
    knex('ingredients').insert({ id: 3, name: 'angostura bitters', amount: 1.0, unit: 'dash' }),
    knex('ingredients').insert({ id: 4, name: 'orange bitters', amount: 1.0, unit: 'dash' }),
    knex('ingredients').insert({ id: 5, name: 'rye whiskey', amount: 2.5, unit: 'ounce' }),
    knex('ingredients').insert({ id: 6, name: 'sweet vermouth', amount: 0.75, unit: 'ounce' }),
    knex('ingredients').insert({ id: 7, name: 'angostura bitters', amount: 2.0, unit: 'dash' }),
    knex('ingredients').insert({ id: 8, name: 'pisco', amount: 1.5, unit: 'ounce' }),
    knex('ingredients').insert({ id: 9, name: 'fresh lemon juice', amount: 1.0, unit: 'ounce' }),
    knex('ingredients').insert({ id: 10, name: 'simple syrup', amount: 0.66, unit: 'ounce' }),
    knex('ingredients').insert({ id: 11, name: 'raw egg white', amount: 1.0, unit: '' }),
  ]).then(() => {
    return knex.raw(
      `SELECT setval('ingredients_id_seq', (SELECT MAX(id) FROM ingredients));`
    );
  })
}
