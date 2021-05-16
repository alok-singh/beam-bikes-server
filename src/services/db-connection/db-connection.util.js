/**
 * DbConnection Utility
 *
 */
const mysql = require('mysql');
const {
  DB_PASSWORD, DATABASE_NAME, DB_PORT, DB_HOST, DB_USER
} = require('@config/vars');

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  database: DATABASE_NAME,
  port: DB_PORT,
  password: DB_PASSWORD
});

db.connect((error) => {
  if (error) {
    throw error;
  }
  console.log('connected');
});

const runQuery = async (query) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(query, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = runQuery;
