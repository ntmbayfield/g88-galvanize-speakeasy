# Galvanize Speakeasy

To complete this exercise, follow the instructions in `src/main.js` to complete each function. You will be required to return joined data with Knex.js, including manipulating the data format.

The database is structured as follows:

```sql
CREATE TABLE glasses (
  id serial PRIMARY KEY,
  name varchar(255),
  created_at timestamptz not null default CURRENT_TIMESTAMP,
  updated_at timestamptz not null default CURRENT_TIMESTAMP
);

CREATE TABLE cocktails (
  id serial PRIMARY KEY,
  name varchar(255),
  instructions text,
  garnish varchar(255),
  glass_id integer REFERENCES glasses (id),
  created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredients (
  id serial PRIMARY KEY,
  name varchar(255),
  amount real DEFAULT 0,
  unit varchar(255),
  created_at timestamptz not null default CURRENT_TIMESTAMP,
  updated_at timestamptz not null default CURRENT_TIMESTAMP
);

CREATE TABLE cocktails_ingredients (
  cocktail_id integer REFERENCES cocktails (id),
  ingredient_id integer REFERENCES ingredients (id)
);
```

## Setup

1. Fork & Clone this repository
1. Run `npm install`
1. Run `npm test` to run the tests
