const express = require("express");
const routerNodes = express.Router();
const pg = require("../../postgres");

//Get  all of nodes
routerNodes.get("/", function (req, res) {
  try {
  } catch (err) {
    console.error(`Error while getting the nodes `, err.message);
  }
});

module.exports = routerNodes;
