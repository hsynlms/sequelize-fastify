# sequelize-fastify
> A simple and lightweight [Sequelize](https://sequelize.org/) plugin for [Fastify](https://github.com/fastify/fastify).

`sequelize-fastify` has great support of sequelize **v5.x**. I will support that simple repository in future as much as I can. So will track any major Sequelize plugin update to give support of each updates as well.

## What is Sequelize?
Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

Please check official website for more information and developer documentation.

https://github.com/sequelize/sequelize

## Installation
`npm install sequelize-fastify`

## Usage
Please find an usage of MSSQL example of the plugin below.

```js
// PS: 'chalk' npm repository is used in that example to put colored logs to the console
// register the plugin
fastify.register(
  require('sequelize-fastify'),
  {
    instance: 'db',
    sequelizeOptions: {
      database: 'DATABASE_NAME',
      dialect: 'mssql',
      host: 'DATABASE_HOST_OR_SERVER',
      username: 'DATABASE_USER_NAME',
      password: 'DATABASE_USER_PASSWORD',
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
```

## Options
| Name              | Type               | Default                             | Description                                                                                                          |
| ---               | ---                | ---                                 | ---                                                                                                                  |
| instance         | string | `sequelize`                                | A decorator instance name which will be available anywhere in the fastify server.                                                 |
| sequelizeOptions         | object            | `{}`                                | Sequelize configuration object which will be passed to Sequelize instance while creating. Please see [API Reference](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor) doc.                                      |

## Contribution
Pull-requests are warmly welcomed.

## License
This project is licensed under the terms of the [MIT license](https://github.com/hsynlms/sequelize-fastify/blob/master/LICENSE).
