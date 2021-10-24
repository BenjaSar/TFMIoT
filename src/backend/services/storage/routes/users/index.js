/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */

//Routes for CRUD operations in the users table

const express = require("express");
const routerUsers = express.Router();
const pg = require("../../postgres");
const queryAllUsers = "Select * FROM MIoT.Sensors  ORDER BY idUsers ASC";

//Get  all of users
routerUsers.get("/", function (req, response) {
  pg.query(queryAllUsers, (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
});
module.exports = routerUsers;
