'use strict'

exports.up = (knex) => {
  return knex.schema.createTable('cocktails', table => {
    table.increments()
    table.string('name')
    table.text('instructions')
    table.string('garnish')
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('cocktails')
}
