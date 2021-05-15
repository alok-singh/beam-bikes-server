/*
  This file contains all the variables
  for the application
  All vairables are either in this file or
  coming from .env file
  .env file must contain all variables in
  .env.example
*/

const path = require('path');
require('dotenv-safe').load({
  path: path.join(process.cwd(), '.env'),
  sample: path.join(process.cwd(), '.env.example')
});

module.exports = {
  env: process.env.NODE_ENV,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  serviceName: 'beam-bikes-server',
  cacheSetting: {
    cacheHost: process.env.CACHE_HOST,
    cachePort: process.env.CACHE_PORT,
    cacheCluster: process.env.CACHE_CLUSTER
  },
  BIKE_LIST_TABLE_NAME: process.env.BIKE_LIST_TABLE_NAME,
  DEFAULT_LIMIT: 100,
  SRID: 4326
};
