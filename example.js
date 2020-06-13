// get required node modules
const fastify = require('fastify')();
const sequelizeFastify = require('./src/index');
const chalk = require('chalk');

// defaults
const defaults = {
  port: 3000
};

// register the plugin
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
        encrypt: true,
        trustedConnection: true,
        requestTimeout: 30000 // 30 seconds
      }
    }
  }
)
.ready(async () => {
  try {
    // first connection as test
    const result = await fastify.db.authenticate();

    // log
    console.log(
      chalk.green('Database connection is successfully established.')
    );

    // close the server
    fastify.close();
  } catch(err) {
    // log the error
    console.log(
      chalk.red(`Connection could not established: ${err}`)
    );
  }
});

// initialize the fastify server
fastify.listen(defaults.port, () => {
  console.log(
    chalk.bgYellow(
      chalk.black(`Fastify server is running on port: ${defaults.port}`)
    )
  )
});
