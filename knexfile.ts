import type { Knex } from 'knex'

// Update with your config settings.
const config: Record<string, Knex.Config> = {
  staging: {
    client: 'pg',
    connection: {
      host: '5.23.54.125',
      port: 5432,
      database: 'bv_perfume_stg',
      user: 'application',
      password: '80|||3n<UJ&F+O'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  },

  production: { // TODO настроить
    // client: 'pg',
    // connection: {
    //   database: 'my_db',
    //   user: 'username',
    //   password: 'password'
    // },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  }

}
module.exports = config
