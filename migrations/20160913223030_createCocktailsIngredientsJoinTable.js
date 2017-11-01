'use strict'

exports.up = (knex) => {
  return knex.schema.createTable('cocktails_ingredients', table => {
    table.integer('cocktail_id')
    table.foreign('cocktail_id').references('id').inTable('cocktails')
    table.integer('ingredient_id')
    table.foreign('ingredient_id').references('id').inTable('ingredients')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('cocktails_ingredients')
}
