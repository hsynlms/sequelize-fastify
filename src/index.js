// get required node modules
const fastifyPlugin = require('fastify-plugin');
const Sequelize = require('sequelize');

// options defaults
const defaults = {
  instance: 'sequelize',
  sequelizeOptions: {}
};

// declare sequelize plugin for fastify
function sequelizePlugin (fastify, opts, done) {
  //combine defaults with provided options
  const options = Object.assign({}, defaults, opts);

  // create a sequelize instance
  const sequelize = new Sequelize(options.sequelizeOptions);

  // create a decorator as instance name if its provided
  if (typeof options.instance === 'string' && options.instance) fastify.decorate(options.instance, sequelize);

  // close sequelize by registering onClose hook (triggered before fastify shutdown)
  fastify.addHook('onClose', async (instance) => {
    await sequelize.close();

    // done
    return;
  });
}

// export the plugin
module.exports = fastifyPlugin(
  sequelizePlugin,
  {
    fastify: '2.x',
    name: 'sequelize-fastify'
  }
);
