'use strict'

exports.seed = (knex, Promise) => {
  return Promise.all([
    // Inserts seed entries
    knex('glasses').insert({ id: 1, name: 'rocks' }),
    knex('glasses').insert({ id: 2, name: 'coupe' }),
    knex('glasses').insert({ id: 3, name: 'champagne flute' })
  ]).then(() => {
    return knex.raw(
      `SELECT setval('glasses_id_seq', (SELECT MAX(id) FROM glasses));`
    );
  })
}
