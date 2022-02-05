const express = require("express");
const routerNodes = express.Router();
const pg = require("../../postgres");
const getAllNodes = "SELECT * FROM MIoT.Nodes  ORDER BY idNodes DESC";
const getNodeById = "SELECT Nodes FROM MIoT.Nodes WHERE idNodes =$1";
const createNodes = "INSERT INTO MIoT.Nodes(idNodes, namenodes) VALUES($1, $2)";
//Get  all of nodes
routerNodes.get("/", function (req, response) {
  pg.query(getAllNodes, (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
});

//Get nodes by Id
routerNodes.get("/:pk", function (request, response) {
  const id = parseInt(request.params.pk);
  pg.query(getNodeById, [id], (err, results) => {
    if (err) {
      throw err;
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
});
//Create Nodes
routerNodes.post("/", function (request, response) {
  const { idNodes, namenodes } = request.body;
  pg.query(createNodes, [idNodes, namenodes], (err, results) => {
    if (err) {
      throw err;
    }
    response.json(results.rows).status(201);
    console.log("Node has been inserted succesfully");
  });
});

module.exports = routerNodes;
