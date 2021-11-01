/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */
//Services for interfacing with PostgresSQL database

const { Pool } = require("pg");
const config = require("./config");

var pool = new Pool(config.db);

pool.connect((err) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  } else {
    console.log("Database is up and running");
    //pool.end();
  }
});

module.exports = pool;
