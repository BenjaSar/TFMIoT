/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */

//Routes for CRUD operations in the table

const express = require("express");
const routerSensors = express.Router();
const pg = require("../../postgres");
const queryAllSensors = "SELECT * FROM MIoT.Sensors  ORDER BY idSensors ASC";
const querySensorbyId = "SELECT * FROM MIoT.Sensors WHERE  idSensors = $1";

//Get  all of Sensors
routerSensors.get("/", function (req, response) {
  pg.query(queryAllSensors, (err, results) => {
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

  pg.query(querySensorbyId, [id], (err, results) => {
    if (err) {
      response.send(err).status(400);
    }
    response.json(results.rows).status(200);
    console.log(results.rows);
  });
});

module.exports = routerSensors;
