'use strict';

require('dotenv').load()
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const connection = require('knex');

chai.should();
chai.use(chaiAsPromised);

global.chaiAsPromised = chaiAsPromised;
global.expect = chai.expect;
global.dbName = process.env.DATABASE_NAME;
global.dbURL = process.env.DATABASE_URL || 'postgres://localhost'
const schema = `
  CREATE TABLE glasses (
    id serial PRIMARY KEY,
    name varchar NOT NULL DEFAULT ''
  );

  CREATE TABLE cocktails (
    id serial PRIMARY KEY,
    name varchar NOT NULL DEFAULT '',
    instructions text DEFAULT '',
    garnish varchar DEFAULT '',
    glass_id integer REFERENCES glasses (id)
  );

  CREATE TABLE ingredients (
    id serial PRIMARY KEY,
    name varchar NOT NULL DEFAULT '',
    amount float DEFAULT 0.0,
    unit varchar DEFAULT 'oz'
  );

  CREATE TABLE cocktails_ingredients (
    cocktail_id integer REFERENCES cocktails (id),
    ingredient_id integer REFERENCES ingredients (id)
  );
`
const seeds = `
  INSERT INTO glasses (name) VALUES ('rocks'), ('coupe'), ('champagne flute');
  INSERT INTO cocktails (name, instructions, garnish, glass_id) VALUES
    ('Pisco Sour', 'Shake and strain into a chilled champagne flute. Dash some Angostura bitters on top.', 'lime slice', 3),
    ('Manhattan', 'Stir all the ingredients in a mixing glass with ice, then strain into a coupe. Drop in a cherry, if desired.', 'cherry', 2),
    ('Old Fashioned', 'Stir the bourbon, simple syrup, and bitters in a mixing glass with ice. Strain into a rocks glass with one large ice cube. Garnish with an orange peel', 'orange peel', 1);
  INSERT INTO ingredients (name, amount, unit) VALUES
    ('bourbon', 2.0, 'ounce'),
    ('simple syrup', 0.25, 'ounce'),
    ('angostura bitters', 1.0, 'dash'),
    ('orange bitters', 1.0, 'dash'),
    ('rye whiskey', 2.25, 'ounce'),
    ('sweet vermouth', 0.75, 'ounce'),
    ('angostura bitters', 2.0, 'dash'),
    ('pisco', 1.5, 'ounce'),
    ('fresh lemon juice', 1.0, 'ounce'),
    ('simple syrup', 0.66, 'ounce'),
    ('raw egg white', 1.0, '');
  INSERT INTO cocktails_ingredients (cocktail_id, ingredient_id) VALUES
    (1, 8), (1, 2), (1, 9), (1, 10),
    (2, 6), (2, 7), (2, 8),
    (3, 1), (3, 2), (3, 3), (3, 4);
`

const dbConfig = {
  client: 'pg',
  connection: `${dbURL}/${dbName}`
};

/*
  Before each `it` function runs (each "example") execute these steps in this order:

  - if the database exists, drop it
  - create a new database with the dbName
  - create a global `knex` variable that is connected to that database
*/
beforeEach(() => {
  return resetDb()
    .then(() => global.knex = connection(dbConfig))
    .then(() => knex.raw(schema))
    .then(() => knex.raw(seeds))
});

// After each example, destroy the knex connection pool, so that future tests can reconnect
afterEach(() => knex.destroy());

// Make a temporary connection to default table, then drop & create dbName
function resetDb(cb) {
  let knexTmp = connection({
    client: 'pg',
    connection: `${dbURL}/postgres`
  })

  return knexTmp.raw(`DROP DATABASE IF EXISTS ${dbName};`)
    .then(result => knexTmp.raw(`CREATE DATABASE ${dbName};`))
    .then(result => knexTmp.destroy())
    .catch((err) => console.error)
}
