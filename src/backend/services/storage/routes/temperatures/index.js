/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */
//Routes for CRUD operations in temperature table

const express = require("express");
const routerTemperatures = express.Router();
const pg = require("../../postgres");
const queryAllTemperatures = "SELECT * FROM MIoT.temperature  ORDER BY id ASC";
const queryTemperaturesbyId = "SELECT * FROM MIoT.temperature WHERE  id = $1";

//Get  all of Temperatures lectures
routerTemperatures.get("/", function (req, response) {
  pg.query(queryAllTemperatures, (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
});

//Get temperatures by id
routerTemperatures.get("/:pk", function (req, response) {
  const id = parseInt(req.params.pk);

  pg.query(queryTemperaturesbyId, [id], (err, results) => {
    if (err) {
      response.send(err).status(400);
    }
    response.json(results.rows).status(200);
    console.log(results.rows);
  });
});

module.exports = routerTemperatures;
