'use strict'

exports.up = (knex) => {
  return knex.schema.table('cocktails', table => {
    table.integer('glass_id')
    table.foreign('glass_id').references('id').inTable('glasses')
  })
}

exports.down = (knex) => {
  return knex.schema.table('cocktails', table => {
    table.dropForeign('glass_id')
    table.dropColumn('glass_id')
  })
}
