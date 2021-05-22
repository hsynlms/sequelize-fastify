'use strict'

const fastify = require('fastify')()
const sequelizeFastify = require('./src/index')
const chalk = require('chalk')

const defaults = {
  port: 3000
}

fastify.register(
  sequelizeFastify,
  {
    instance: 'db',
    sequelizeOptions: {
      database: '',
      dialect: 'mssql',
      host: '',
      username: '',
      password: '',
      port: 1433,
      dialectOptions: {
        options: {
          requestTimeout: 300000
        }
      }
    }
  }
)
  .ready(async () => {
    try {
      // first connection as test
      await fastify.db.authenticate()

      console.log(
        chalk.green('Database connection is successfully established.')
      )

      fastify.close()
    } catch (err) {
      console.log(
        chalk.red(`Connection could not established: ${err}`)
      )
    }
  })

fastify.listen(defaults.port, () => {
  console.log(
    chalk.bgYellow(
      chalk.black(`Fastify server is running on port: ${defaults.port}`)
    )
  )
})
