const knex = require('./db')

function getAllGlasses () {
  // Return everything from the `glasses` table
  return knex('glasses')
}

function getAllGlassesWithCocktails () {
  /*
    Join glasses with cocktails -- do not worry about
    nesting the data in a particular way
  */
  return knex('glasses')
    .join('cocktails', 'cocktails.glass_id', 'glasses.id')
}

function getAllGlassesWithCocktailsNested () {
  /*
    Join the glasses and cocktails table together but nest
    all associated `cocktails` within each glass record.
    For example:
    {
      id: 1,
      name: 'rocks',
      cocktails: [
        { ... }
      ]
    }
  */

  return knex('glasses')
    .then(glasses => {
      const promises = glasses.map(glass => {
        return knex('cocktails').where({ glass_id: glass.id })
          .then(cocktails => {
            glass.cocktails = cocktails
            return glass
          })
      })

      return Promise.all(promises)
    })
}

function getCocktailsAndIngredients () {
  /*
    Join glasses with cocktails via the join table -- do not
    worry about nesting the data in a particular way
  */

  return knex('cocktails')
    .join('cocktails_ingredients', 'cocktails_ingredients.cocktail_id', 'cocktails.id')
    .join('ingredients', 'cocktails_ingredients.ingredient_id', 'ingredients.id')
}

function getCocktailsWithNestedIngredients () {
  /*
    Join the cocktails and ingredients table together but nest
    all associated `ingredients` within each cocktail record.
    For example:
    [
      {
        id: 1,
        name: 'Pisco Sour',
        ingredients: [
          { ... }, { ... }, { ... }
        ]
      },
      { ... }
    ]
  */

  return knex('cocktails')
    .then(cocktails => {
      const promises = cocktails.map(cocktail => {
        return knex('cocktails_ingredients')
          .join('ingredients', 'ingredients.id', 'cocktails_ingredients.ingredient_id')
          .where('cocktails_ingredients.cocktail_id', cocktail.id)
          .then(ingredients => {
            cocktail.ingredients = ingredients
            return cocktail
          })
      })

      return Promise.all(promises)
    })
}

function getCocktailsWithNestedIngredientsAndGlass () {
  /*
    ----------------------------------------------------------
    *** BONUS:
    ----------------------------------------------------------
    Join the cocktails and ingredients table together but nest
    all associated `ingredients` within each cocktail record.
    Also include the associate glass in a separate spot.
    For example:
    [
      {
        id: 1,
        name: 'Pisco Sour',
        glass: { ... },
        ingredients: [
          { ... }, { ... }, { ... }
        ]
      },
      { ... }
    ]
  */

  return knex('cocktails')
    .then(cocktails => {
      const promises = cocktails.map(cocktail => {
        return knex('cocktails_ingredients')
          .join('ingredients', 'ingredients.id', 'cocktails_ingredients.ingredient_id')
          .where('cocktails_ingredients.cocktail_id', cocktail.id)
          .then(ingredients => {
            cocktail.ingredients = ingredients
            return knex('glasses').where({ id: cocktail.glass_id }).first().then(glass => {
              cocktail.glass = glass
              return cocktail
            })
          })
      })

      return Promise.all(promises)
    })
}

module.exports = {
  getAllGlasses,
  getAllGlassesWithCocktails,
  getAllGlassesWithCocktailsNested,
  getCocktailsAndIngredients,
  getCocktailsWithNestedIngredients,
  getCocktailsWithNestedIngredientsAndGlass
}
