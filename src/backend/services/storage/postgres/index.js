/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */

//Services for interfacing with PostgresSQL database

const { Pool } = require("pg");
const config = require("./config");

/*var config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  max: 20,
  idleTimeoutMillis: 30000,
};*/
var pool = new Pool(config.db);

//Health check point
/*const health = (request, response) => {
  pool.query("SELECT NOW()", (err, results) => {
    error(err, response);
    response.status(200).json({ info: "Database is up and running" });
  });
};*/
pool.connect((err) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  } else {
    console.log("Database is up and running");
    pool.end();
  }
});

module.exports = pool;
