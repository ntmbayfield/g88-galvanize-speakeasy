'use strict'

exports.up = (knex) => {
  return knex.schema.createTable('glasses', table => {
    table.increments()
    table.string('name')
    table.timestamps(true, true)
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('glasses')
}
