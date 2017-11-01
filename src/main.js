const knex = require('./db')

function getAllGlasses () {
  // Return everything from the `glasses` table
}

function getAllGlassesWithCocktails () {
  /*
    Join glasses with cocktails -- do not worry about
    nesting the data in a particular way
  */
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
}

function getCocktailsAndIngredients () {
  /*
    Join glasses with cocktails via the join table -- do not
    worry about nesting the data in a particular way
  */
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
