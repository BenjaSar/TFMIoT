/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */

//Routes for CRUD operations in users table
const Helper = require("../authentication/helper");
const { json } = require("express");
const express = require("express");
const routerUsers = express.Router();
const pg = require("../../postgres");
const auth = require("../authentication");
const { generateToken, hashPassword } = require("../authentication/helper");
const getAllUsers = "SELECT Users FROM MIoT.Users  ORDER BY idUsers ASC";
const getAllUsersLogin = "SELECT * FROM MIoT.Users  ORDER BY idUsers ASC";
const getUserByID = "SELECT Users FROM MIoT.Users WHERE idUsers=$1";
const editUserById = "ALTER Users FROM MIoT.Users WHERE idUsers=$1";
const createUser =
  "INSERT INTO MIoT.Users(usersName, usersSurname, userPosition, usersEmail, usersPasswords, usersConfirmPasswords) VALUES($1, $2, $3, $4, $5, $6)";
const deleteUsers = "DELETE FROM MIoT.Users WHERE  idUsers=$1";
usersLogin = [];
function setValue(value) {
  usersLogin = value;
}

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
routerUsers.get("/:id", function (req, response) {
  const idUsers = parseInt(req.params.id);
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
routerUsers.post("/create", function (request, response) {
  let {
    //idUsers,
    usersName,
    usersSurname,
    userPosition,
    usersEmail,
    usersPasswords,
    usersConfirmPasswords,
  } = request.body;

  /*if (
    !request.body.usersEmail ||
    !request.body.usersPasswords ||
    !request.body.usersName ||
    !request.body.usersSurname
  ) {
    return response
      .status(400)
      .send({ Mensaje: "Por favor suministre los campos necesarios" });
  }
  if (!Helper.isValidEmail(request.body.usersEmail)) {
    return response.send({
      Mensaje: "Por favor ingrese una dirección de email valida",
    });
  }*/

  const hashPassword = Helper.hashPassword(request.body.usersPasswords);
  const hashConfirmPassword = Helper.hashPassword(
    request.body.usersConfirmPasswords
  );
  pg.query(
    createUser,
    [
      usersName,
      usersSurname,
      userPosition,
      usersEmail,
      (usersPasswords = hashPassword),
      (usersConfirmPasswords = hashConfirmPassword),
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(usersPasswords);
      console.log("User have been inserted succesfully");
    }
  );
});

//Login user
routerUsers.post("/login", (req, response) => {
  //Validate if user exists in our database

  uLogin = [];
  pg.query(getAllUsersLogin, (err, results) => {
    if (err) {
      throw err;
    }
    uLogin = results.rows;
    console.log("Estoy aqui".uLogin);
  });

  const { usersEmail, usersPasswords } = req.body;
  const user = uLogin((u) => {
    return u.usersEmail === usersEmail && u.usersPasswords === usersPasswords;
  });
  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { usersEmail: user.usersEmail, userspasswords: user.userspasswords },
      accessTokenSecret
    );
    response.json({
      accessToken,
    });
  } else {
    response.send("Username or password incorrect");
  }
});
//Edit user by Id
routerUsers.put("/:pk", function (request, response) {
  const idUsers = parseInt(request.params.pk);
  pg.query(editUserById, [idUsers], (err, results) => {
    if (err) {
      throw err;
    }
    response.status(201).send("User modified in a successful way");
  });
});

//Delete user by Id
routerUsers.delete("/:idUsers", function (request, response) {
  const idUsers = parseInt(request.params.idUsers);
  pg.query(deleteUsers, [idUsers], (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).send(`User deleted with ID:${idUsers}`);
    console.log("User have been removed succesfully");
  });
});

module.exports = routerUsers;
