const path = require('path');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: '13.250.11.161',
      user: 'postgres',
      password: '',
      port: '5432',
      database: 'demo',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds'),
    },
  },
};
