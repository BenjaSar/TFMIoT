/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */
//Routes for CRUD operations in temperature table";
const express = require("express");
const routerTemperatures = express.Router();
const pg = require("../../postgres");
const client = require("../../mqttsubscribe");
const getAllTemperatures =
  "SELECT Temperatures FROM MIoT.Temperatures ORDER BY idTemperature ASC";
const getTemperaturesbyId =
  "SELECT * FROM MIoT.Temperatures WHERE  idTemperature = $1";
const createTemperature =
  "INSERT INTO MIoT.Temperatures(temperature) VALUES($1)";
//Get  all of Temperatures lectures
routerTemperatures.get("/", function (request, response) {
  pg.query(getAllTemperatures, (err, results) => {
    if (err) {
      res.send(err).status(400);
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
});

//Get temperatures by id
routerTemperatures.get("/:pk", function (req, response) {
  const id = parseInt(req.params.pk);

  pg.query(getTemperaturesbyId, [id], (err, results) => {
    if (err) {
      response.send(err).status(400);
    }
    response.json(results.rows).status(200);
    console.log(results.rows);
  });
});

//Insert temperatures
routerTemperatures.post("/", function (request, response, next) {
  //temperatura = client.temperature;
  pg.query(createTemperature, [temperatura], (err, results) => {
    if (err) {
      response.send(err).status(400);
    }
    response.status(201).json(results);
    console.log(`Temperature inserted succesfully, ${temperature}`);
  });
});
module.exports = routerTemperatures;
