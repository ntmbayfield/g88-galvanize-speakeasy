'use strict'

exports.seed = (knex, Promise) => {
  return Promise.all([
    // Inserts seed entries
    knex('cocktails').insert({
      id: 1,
      name: 'Pisco Sour',
      instructions: 'Shake and strain into a chilled champagne flute. Dash some Angostura bitters on top.',
      garnish: 'lime slice',
      glass_id: 3
    }),
    knex('cocktails').insert({
      id: 2,
      name: 'Manhattan',
      instructions: 'Stir all the ingredients in a mixing glass with ice, then strain into a coupe. Drop in a cherry, if desired.',
      garnish: 'cherry',
      glass_id: 2
    }),
    knex('cocktails').insert({
      id: 3,
      name: 'Old Fashioned',
      instructions: 'Stir the bourbon, simple syrup, and bitters in a mixing glass with ice. Strain into a rocks glass with one large ice cube. Garnish with an orange peel',
      garnish: 'orange peel',
      glass_id: 1
    })
  ]).then(() => {
    return knex.raw(
      `SELECT setval('cocktails_id_seq', (SELECT MAX(id) FROM cocktails));`
    );
  })
}
