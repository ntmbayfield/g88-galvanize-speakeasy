const knex = require('./db');


function getAllGlasses () {
  // Return everything from the `glasses` table
  return knex
  .select()
  .table('glasses')
}

function getAllGlassesWithCocktails () {
  /*
    Join glasses with cocktails -- do not worry about
    nesting the data in a particular way
  */
  return knex('glasses')
    .join('cocktails', 'cocktails.glass_id', 'glasses.id');
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

  //select all glasses
  return knex('glasses')
    .then(allGlasses => {
      const promises = allGlasses.map(glass => {
        return knex('cocktails')
          .where({
            glass_id: glass.id
          })
          .then(allCocktails => {
            glass.cocktails = allCocktails;
            return glass;
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
    .then(allCocktails => {
      const promises = allCocktails.map(cocktail => {
        return knex('cocktails_ingredients')
          .join('ingredients', 'ingredients.id', 'cocktails_ingredients.ingredient_id')
          .where('cocktails_ingredients.cocktail_id', cocktail.id)
          .then(allIngredients => {
            cocktail.ingredients = allIngredients
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

}

module.exports = {
  getAllGlasses,
  getAllGlassesWithCocktails,
  getAllGlassesWithCocktailsNested,
  getCocktailsAndIngredients,
  getCocktailsWithNestedIngredients,
  getCocktailsWithNestedIngredientsAndGlass
}
