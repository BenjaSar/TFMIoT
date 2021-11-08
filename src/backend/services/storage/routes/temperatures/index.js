/**
 * Embedded Systems Laboratory - UBA - SOFSE
 * Author: FS
 * MIoT - 2021
 */
//Routes for CRUD operations in temperature table

const express = require("express");
const routerTemperatures = express.Router();
const pg = require("../../postgres");
const getAllTemperatures =
  "SELECT Temperatures FROM MIoT.Temperatures ORDER BY idTemperature ASC";
const getTemperaturesbyId =
  "SELECT * FROM MIoT.Temperatures WHERE  idTemperature = $1";
const createTemperature =
  "INSERT INTO MIoT.Temperatures(idTemperature, temperatures) VALUES($1, $2)";

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
routerTemperatures.post("/", function (request, response) {
  const { idTemperature, temperatures } = request.body;
  pg.query(createTemperature, [idTemperature, temperatures], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    response.json(results.rows).status(201);
    console.log("Temperature insert succesful");
  });
});
module.exports = routerTemperatures;
