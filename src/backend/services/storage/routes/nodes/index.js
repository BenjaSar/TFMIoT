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
routerNodes.get("/:id", function (request, response) {
  const idNodes = parseInt(request.params.id);
  pg.query(getNodeById, [idNodes], (err, results) => {
    if (err) {
      response.send(err).status(400);
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  });
});
//Create Nodes
routerNodes.post("/create", function (req, res) {
  let { idNodes, namenodes } = req.body;
  pg.query(createNodes, [idNodes, namenodes], (err, results) => {
    if (err) {
      return err;
    }
    if (results) {
      res.send("Node has been inserted succesfully").status(201);
    }
  });
});

module.exports = routerNodes;
