/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */

//Services for interfacing with PostgresSQL database

const { Pool } = require("pg");

var config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  max: 10,
  idleTimeoutMillis: 30000,
};
var pool = new pg.createPool(config);

//Health check point
const health = (request, response) => {
  pool.query("SELECT NOW()", (err, results) => {
    error(err, response);
    response.status(200).json({ info: "Database is up and running" });
  });
};
module.exports = pool;
