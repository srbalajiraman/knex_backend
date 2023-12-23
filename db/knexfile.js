require("dotenv").config()
const { KnexSnakeCaseMappers } = require("objection") // to change the word to snake case. Ex. firstName -> first_name

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    },
    debug: true
  },
  ...KnexSnakeCaseMappers
};
