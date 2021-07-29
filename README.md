# sequelize-fastify
> A simple and lightweight [Sequelize](https://sequelize.org/) plugin for [Fastify](https://github.com/fastify/fastify).

[![Downloads](https://img.shields.io/npm/dm/sequelize-fastify.svg)](https://npmjs.com/sequelize-fastify)
[![install size](https://packagephobia.com/badge?p=sequelize-fastify)](https://packagephobia.com/result?p=sequelize-fastify)

`sequelize-fastify` has great support of sequelize **v6.x**. I will support that simple repository in future as much as I can. So will track any major Sequelize plugin update to give support of each updates as well.

## What is Sequelize?
Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

Please check [official website](https://github.com/sequelize/sequelize) for more information and developer documentation.

## Installation
```
$ npm install sequelize-fastify
```

## Usage

```js
fastify.register(
  require('sequelize-fastify'),
  {
    instance: 'db',
    sequelizeOptions: {
      dialect: 'DIALECT_NAME', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
      database: 'DATABASE_NAME',
      username: 'DATABASE_USER_NAME',
      password: 'DATABASE_USER_PASSWORD',
      options: {
        host: 'DATABASE_HOST_OR_SERVER',
        port: 'DATABASE_PORT'
      }
    }
  }
)
  .ready(async () => {
    try {
      // first connection
      const result = await fastify.db.authenticate()

      console.log(
        chalk.green('Database connection is successfully established.')
      )
    } catch(err) {
      console.log(
        chalk.red(`Connection could not established: ${err}`)
      )
    } finally {
      fastify.close()
    }
  })
```

## Options
| Name               | Type       | Default          | Description                                                                       |
| ---                | ---        | ---              | ---                                                                               |
| instance           | string     | `sequelize`      | A decorator instance name which will be available anywhere in the fastify server. |
| sequelizeOptions   | object     | `{}`             | Sequelize configuration object which will be passed to Sequelize instance while creating. Please see [API Reference](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor) doc. |
