'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cocktails_ingredients').del()
    .then(() => knex('ingredients').del())
    .then(() => knex('cocktails').del())
    .then(() => knex('glasses').del())
}
