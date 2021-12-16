/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */

//Routes for CRUD operations in users table

const express = require("express");
const routerUsers = express.Router();
const pg = require("../../postgres");
const getAllUsers = "SELECT Users FROM MIoT.Users  ORDER BY idUsers ASC";
const getUserByID = "SELECT Users FROM MIoT.Users WHERE idUsers=$1";
const editUserById = "ALTER Users FROM MIoT.Users WHERE idUsers=$1";
const createUser = "INSERT INTO MIoT.Users(idUsers, users) VALUES($1, $2)";
const deleteUsers = "DELETE FROM MIoT.Users WHERE  idUsers=$1";

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

//Get user by id
routerUsers.get("/:idUsers", function (req, response) {
  const idUsers = parseInt(req.params.idUsers);
  pg.query(getUserByID, [idUsers], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
});
//Insert user by id
routerUsers.post("/", function (request, response) {
  const { idUsers, users } = request.body;
  pg.query(createUser, [idUsers, users], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    response.send(`User added with ID:${idUsers}`).status(201);
    console.log("User have been inserted succesfully");
  });
});

//Edit user by Id
routerUsers.put("/:idUsers", function (request, response) {
  const idUsers = parseInt(request.params.idUsers);
  pg.query(editUserById, [idUsers], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    response.status(201).send("User modified in a successful way");
  });
});

//Delete user by Id
routerUsers.delete("/:idUsers", function (request, response) {
  const idUsers = parseInt(request.params.idUsers);
  pg.query(deleteUsers, [idUsers], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    response.status(200).send(`User deleted with ID:${idUsers}`);
    console.log("User have been removed succesfully");
  });
});

module.exports = routerUsers;
