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

//Get  all of users
routerUsers.get("/", function (req, response) {
  console.log("Probando");
  pg.query(getAllUsers, (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
});

//Insert sensor by id
routerUsers.post("/", function (request, response) {
  const { idSensors, sensors } = request.body;
  pg.query(createSensor, [idSensors, sensors], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    response
      .json(results.rows)
      .send("Sensor added with id ${result.insertId}")
      .status(201);

    console.log("Data insert succesful");
  });
});
module.exports = routerUsers;
