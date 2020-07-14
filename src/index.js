'use strict'

// get required modules
const fastifyPlugin = require('fastify-plugin')
const Sequelize = require('sequelize')

// plugin defaults
const defaults = {
  instance: 'sequelize',
  sequelizeOptions: {}
}

// declare sequelize plugin for fastify
function sequelizePlugin (fastify, opts, done) {
  // combine defaults with provided options
  const options = Object.assign({}, defaults, opts)

  // create a sequelize instance
  const sequelize = new Sequelize(options.sequelizeOptions)

  // create a decorator as instance name if its provided
  if (typeof options.instance === 'string' && options.instance) {
    fastify.decorate(options.instance, sequelize)
  }

  // close sequelize database connection before shutdown
  // 'onClose' is triggered when fastify.close() is invoked to stop the server
  fastify.addHook('onClose', async (instance) => {
    // close the connection
    await sequelize.close()

    // done
    // eslint-disable-next-line no-useless-return
    return
  })

  // done
  done()
}

// export the plugin
module.exports = fastifyPlugin(
  sequelizePlugin,
  {
    fastify: '3.x',
    name: 'sequelize-fastify'
  }
)
