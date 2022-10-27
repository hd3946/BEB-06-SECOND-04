const dotenv = require('dotenv');
dotenv.config();

const config = {
  development: {
    host: 'localhost',
    user: process.env.DATABASE_USER_NAME,
    password: process.env.DATABASE_SPRINT_PASSWORD,
    database: 'FantasticDB'
  }
};

module.exports = config;
