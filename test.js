'use strict'

const fastify = require('fastify')()
const sequelizeFastify = require('./src/index')
const chalk = require('chalk')

// test cases

// TODO:
// eslint-disable-next-line
test('database connection', done => {
  fastify.register(
    sequelizeFastify,
    {
      instance: 'db',
      sequelizeOptions: {
        dialect: 'mysql',
        host: 'localhost',
        user: 'root',
        database: 'sequelize',
        password: 'root',
        port: 3306
      }
    }
  )
    .ready(async () => {
      try {
        await fastify.db.authenticate()

        console.log(
          chalk.green('Database connection is successfully established.')
        )

        done()
      } catch (err) {
        done(`Connection could not established: ${err}`)
      }
    })
})
