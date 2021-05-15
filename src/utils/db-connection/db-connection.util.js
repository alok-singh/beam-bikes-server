/**
 * DbConnection Utility
 *
 */
const mysql = require('mysql');
const {
  DB_PASSWORD, DATABASE_NAME, DB_PORT, DB_HOST, DB_USER
} = require('@config/vars');

let db = false;
let connected = false;

const createConnection = () => {
  db = mysql.createConnection({
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
    connected = true;
  });
};

const runQuery = async (query) => {
  return new Promise((resolve, reject) => {
    try {
      if (!connected) {
        createConnection();
      }
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
