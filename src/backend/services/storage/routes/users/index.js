/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */

//Routes for CRUD operations in users table

const express = require("express");
const routerUsers = express.Router();
const pg = require("../../postgres");
const getAllUsers = "Select Users FROM MIoT.Users  ORDER BY idUsers ASC";
const createUSer = "INSERT INTO MIoT.Users(idUsers, users) VALUES($1, $2)";
const deleteUsers = "DELETE FROM MIoT.Users(idUsers) WHERE   idUsers = $1";

//Get  all of users
routerUsers.get("/", function (req, response) {
  pg.query(getAllUsers, (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
});

//Insert user by id
routerUsers.post("/:idUsers", function (request, response) {
  const idUsers = parseInt(request.params.idUsers);
  const { users } = request.body;
  pg.query(createUSer, [idUsers, users], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    response.json(results.rows).status(201);
    console.log("User have been inserted succesfully");
  });
});

//Delete user by id
routerUsers.delete("/:idUsers", function (request, response) {
  const idUsers = parseInt(request.params.idUsers);
  pg.query(deleteUsers, [idUsers], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    response.status(200).send(`User deleted with ID:${id}`);
  });
});

module.exports = routerUsers;
