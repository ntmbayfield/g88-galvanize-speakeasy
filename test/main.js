require('dotenv').load()
const chai = require('chai')
const expect = chai.expect
const main = require('../src/main')
const config = require('../knexfile').test
chai.use(require('chai-as-promised'))

describe('Galvanize Speakeasy', function () {
  before(function () {
    const tmpConnection = require('knex')({ client: 'pg', connection: process.env.DATABASE_URL })
    return tmpConnection.raw(`CREATE DATABASE ${process.env.DATABASE_NAME};`)
      .catch(() => Promise.resolve('Everything is OK'))
      .then(() => global.knex = require('../src/db'))
      .then(() => knex.migrate.latest(config))
      .then(() => knex.seed.run())
      .catch(() => console.log(`Migrations or seeds failed.`))
  })

  describe('#getAllGlasses()', function () {
    it('should return a list of all the glasses in the database', function () {
      return main.getAllGlasses().then(result => {
        expect(result.length).to.equal(3)

        const glass = result[0]
        expect(glass.id).to.be.ok
        expect(glass.name).to.be.ok
      })
    })
  })

  describe('#getAllGlassesWithCocktails()', function () {
    it('should return a list of all the glasses in the database with an associated cocktail', function () {
      return main.getAllGlassesWithCocktails().then(result => {
        expect(result.length).to.equal(3)

        const row = result[0]
        expect(row.id).to.be.ok
        expect(row.name).to.be.ok
        expect(row.instructions).to.be.ok
        expect(row.garnish).to.be.ok
      })
    })
  })

  describe('#getAllGlassesWithCocktailsNested()', function () {
    it('should return a list of all the glasses in the database with associated cocktails nested inside', function () {
      return main.getAllGlassesWithCocktailsNested().then(result => {
        expect(result.length).to.equal(3)

        const row = result[0]
        expect(row.id).to.be.ok
        expect(row.name).to.be.ok

        const cocktails = row.cocktails
        expect(cocktails).to.be.ok

        const cocktail = cocktails[0]
        expect(cocktail.id).to.be.ok
        expect(cocktail.name).to.be.ok
        expect(cocktail.instructions).to.be.ok
        expect(cocktail.garnish).to.be.ok
      })
    })
  })

  describe('#getCocktailsAndIngredients()', function () {
    it('should return a list of all the cocktails and ingredients in the database', function () {
      return main.getCocktailsAndIngredients().then(result => {
        expect(result.length).to.equal(11)

        const row = result[0]
        expect(row.id).to.be.ok
        expect(row.name).to.be.ok
        expect(row.instructions).to.be.ok
        expect(row.garnish).to.be.ok
        expect(row.glass_id).to.be.ok
        expect(row.cocktail_id).to.be.ok
        expect(row.ingredient_id).to.be.ok
        expect(row.amount).to.be.ok
      })
    })
  })

  describe('#getCocktailsWithNestedIngredients()', function () {
    it('should return a list of all the cocktails with nested ingredients', function () {
      return main.getCocktailsWithNestedIngredients().then(cocktails => {
        expect(cocktails.length).to.equal(3)

        const manhattan = cocktails.find(cocktail => cocktail.name === 'Manhattan')
        expect(manhattan.id).to.be.ok
        expect(manhattan.name).to.be.ok
        expect(manhattan.instructions).to.be.ok
        expect(manhattan.garnish).to.be.ok

        const ingredients = manhattan.ingredients
        expect(ingredients).to.be.ok

        const ingredient = ingredients[0]
        expect(ingredient.id).to.be.ok
        expect(ingredient.name).to.be.ok
        expect(ingredient.amount).to.be.ok
      })
    })
  })

  xdescribe('BONUS: #getCocktailsWithNestedIngredientsAndGlass()', function () {
    it('should return a list of all the cocktails with their ingredients and associated glass', function () {
      return main.getCocktailsWithNestedIngredientsAndGlass().then(cocktails => {
        expect(cocktails.length).to.equal(3)

        const manhattan = cocktails.find(cocktail => cocktail.name === 'Manhattan')
        expect(manhattan.id).to.be.ok
        expect(manhattan.name).to.be.ok
        expect(manhattan.instructions).to.be.ok
        expect(manhattan.garnish).to.be.ok

        const glass = manhattan.glass
        expect(glass).to.be.ok
        expect(glass.id).to.be.ok
        expect(glass.name).to.be.ok

        const ingredients = manhattan.ingredients
        expect(ingredients).to.be.ok

        const ingredient = ingredients[0]
        expect(ingredient.id).to.be.ok
        expect(ingredient.name).to.be.ok
        expect(ingredient.amount).to.be.ok
      })
    })
  })
})
