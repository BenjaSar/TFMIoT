// Import the top-level function of express
const express = require("express");
// Creates an Express application using the top-level function
const app = express();

require("dotenv").config();

var cors = require("cors");

var corsOption = { origin: "*", optionSuccesStatus: 200 };

app.use(cors(corsOption));
// Define port number as 3000
const PORT = process.env.PORT || 3000;

// Routes HTTP GET requests to the specified path "/" with the specified callback function
app.get("/", function (request, response) {
  response.send("Hello, World!");
});

// Make the app listen on port 3000
app.listen(PORT, function (err, res) {
  if (!err) {
    console.log("Server listening on http://localhost:" + PORT);
  } else {
    console.log(JSON.stringify(err));
  }
});