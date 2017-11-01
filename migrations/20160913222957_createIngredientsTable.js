'use strict'

exports.up = (knex) => {
  return knex.schema.createTable('ingredients', table => {
    table.increments()
    table.string('name')
    table.float('amount').defaultsTo(0.0)
    table.string('unit')
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('ingredients')
}
