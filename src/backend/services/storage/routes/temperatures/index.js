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
  "SELECT * FROM MIoT.Temperatures where idsensors=$1 ORDER BY idTemperature DESC LIMIT 20";
const getTemperaturesbyId =
  "SELECT * FROM MIoT.Temperatures WHERE  idsensors = $1 ORDER BY datestime DESC LIMIT 1";
const createTemperature =
  "INSERT INTO MIoT.Temperatures(temperature, idsensors) VALUES($1, $2)";
//Get  all of Temperatures lectures
routerTemperatures.get("/:id/todas", function (req, response) {
  const id = req.params.id;
  pg.query(getAllTemperatures, [id], (err, results) => {
    if (err) {
      response.send(err).status(400);
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
});

//Get temperatures by id
routerTemperatures.get("/:pk", function (req, response) {
  const id = req.params.pk;

  pg.query(getTemperaturesbyId, [id], (err, results) => {
    if (err) {
      response.send(err).status(400);
    }
    response.json(results.rows).status(200);
    console.log(results.rows);
  });
});

//Insert temperatures
routerTemperatures.post("/", function (request, response) {
  //temperatura = client.temperatura;
  //idsensors = client.idsensors;
  pg.query(createTemperature, [temperatura, idsensors], (err, results) => {
    if (err) {
      response.send(err).status(400);
    }
    response.status(201).json(results);
    console.log(`Temperature inserted succesfully, ${temperatura}`);
    console.log(`Codigo sensor: ${request.body.idsensors}`);
  });
});
module.exports = routerTemperatures;
