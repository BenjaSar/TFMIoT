const express = require("express");
const routerNodes = express.Router();
const pg = require("../../postgres");
const getAllNodes = "SELECT * FROM MIoT.Nodes  ORDER BY idNodes DESC";
const createNodes = "INSERT INTO MIoT.Nodes(idNodes, Nodes) VALUES($1, $2)";
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

//create Nodes
//Insert sensor by id
routerNodes.post("/", function (request, response) {
  const { idNodes, nodes } = request.body;
  pg.query(createNodes, [idNodes, nodes], (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    response.json(results.rows).status(201);

    console.log("Node insert succesful");
  });
});

module.exports = routerNodes;
