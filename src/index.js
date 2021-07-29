'use strict'

const fastifyPlugin = require('fastify-plugin')
const Sequelize = require('sequelize')
const pkg = require('../package.json')

const defaults = {
  instance: 'sequelize',
  sequelizeOptions: {}
}

function sequelizePlugin (fastify, opts, done) {
  const options = Object.assign({}, defaults, opts)
  const sequelize = new Sequelize(options.sequelizeOptions)

  if (typeof options.instance === 'string' && options.instance) {
    fastify.decorate(options.instance, sequelize)
  }

  // close sequelize database connection before shutdown
  // 'onClose' is triggered when fastify.close() is invoked to stop the server
  fastify.addHook(
    'onClose',
    (instance, done) => sequelize.close().then(() => done())
  )

  done()
}

module.exports = fastifyPlugin(
  sequelizePlugin,
  {
    fastify: '3.x',
    name: pkg.name
  }
)
