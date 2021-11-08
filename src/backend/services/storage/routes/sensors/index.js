/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */

//Routes for CRUD operations in sensors table

const { response } = require("express");
const express = require("express");
const req = require("express/lib/request");
const routerSensors = express.Router();
const pg = require("../../postgres");
const getAllSensors = "SELECT * FROM MIoT.Sensors  ORDER BY idSensors DESC";
const getSensorbyId = "SELECT * FROM MIoT.Sensors WHERE  idSensors = $1";
const createSensor =
  "INSERT INTO MIoT.Sensors(idSensors, sensors) VALUES($1, $2)";

//Get  all of Sensors
routerSensors.get("/", function (req, response) {
  pg.query(getAllSensors, (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
});

//Get sensor by id
routerSensors.get("/:pk", function (req, response) {
  const id = parseInt(req.params.pk);

  pg.query(getSensorbyId, [id], (err, results) => {
    if (err) {
      response.send(err).status(400);
    }
    response.json(results.rows).status(200);
    console.log(results.rows);
  });
});

//Insert sensor by id
routerSensors.post("/", function (request, response) {
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
    console.log("Sensor insert succesful");
  });
});
module.exports = routerSensors;
