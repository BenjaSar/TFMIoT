// Import the top-level function of express
const express = require("express");
// Creates an Express application using the top-level function
const app = express();
require("dotenv").config();

var cors = require("cors");

var corsOption = { origin: "*", optionSuccesStatus: 200 };

app.use(cors(corsOption));
// Define port number as 8000
const PORT = process.env.PORT || 5000;

// Routes HTTP GET requests to the specified path "/" with the specified callback function
app.get("/", function (request, response) {
  response.send("Api is running");
});

var sensors = require("./routes/sensors");
var users = require("./routes/users");
var temperatures = require("./routes/temperatures");

app.use(express.json());

app.use("/api/v1/sensors", sensors);
app.use("/api/v1/users", users);
app.use("/api/v1/temperatures", temperatures);
// Make the app listen on port 8000
app.listen(PORT, function (err, res) {
  if (!err) {
    console.log("Server listening on http://localhost:" + PORT);
  } else {
    console.log(JSON.stringify(err));
  }
});
module.exports = app;
