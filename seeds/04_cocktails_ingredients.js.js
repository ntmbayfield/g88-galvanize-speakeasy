'use strict'

exports.seed = (knex, Promise) => {
  return Promise.all([
    knex('cocktails_ingredients').insert({ cocktail_id: 3, ingredient_id: 1 }),
    knex('cocktails_ingredients').insert({ cocktail_id: 3, ingredient_id: 2 }),
    knex('cocktails_ingredients').insert({ cocktail_id: 3, ingredient_id: 3 }),
    knex('cocktails_ingredients').insert({ cocktail_id: 3, ingredient_id: 4 }),
    knex('cocktails_ingredients').insert({ cocktail_id: 1, ingredient_id: 8 }),
    knex('cocktails_ingredients').insert({ cocktail_id: 1, ingredient_id: 9 }),
    knex('cocktails_ingredients').insert({ cocktail_id: 1, ingredient_id: 10 }),
    knex('cocktails_ingredients').insert({ cocktail_id: 1, ingredient_id: 11 }),
    knex('cocktails_ingredients').insert({ cocktail_id: 2, ingredient_id: 5 }),
    knex('cocktails_ingredients').insert({ cocktail_id: 2, ingredient_id: 6 }),
    knex('cocktails_ingredients').insert({ cocktail_id: 2, ingredient_id: 7 }),
  ])
}
