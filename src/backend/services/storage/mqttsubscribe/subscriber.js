/** #################################################################################
# Author:FS
# Date: 2021
# License: MIT
# Project: MQTT Subscribe
# Brief: Services to subscribe to the topic in the mqtt broker.
#################################################################################
 */

const mqtt = require("mqtt");
const { client_encoding, port } = require("pg/lib/defaults");
topic = "esp32/temperature";
const axios = require("axios");
const { response } = require("express");
//var caFile = fs.readFileSync("ca.crt");
//var KEY = fs.readFileSync("client-certs\\client.key");
//var CERT = fs.readFileSync("client-certs\\client.crt");

var options = {
  clientId: "mqttSuscriber01",
  username: "mqttSuscriber01",
  password: "654321",
  clean: true,
  port: 1883,
  keeplive: 60,
  connectTimeout: 30 * 1000,
  //host: "172.018.0.2",
  //protocol:'mqtts',
  //rejectUnauthorized: false,
  //key: KEY,
  //cert: CERT,
  //ca: caFile,
};

//var client = mqtt.connect("mqtt://192.168.0.13:port", options);
var client = mqtt.connect("mqtt://192.168.0.13:port", options);
console.log("connected flag  " + client.connected);
client.on("connect", function () {
  console.log("connected  " + client.connected);
  if (client.connected == true) {
    client.subscribe(topic, function (err) {
      if (err) {
        console.error(err);
        client.end;
        client.reconnect();
      }
      client.on("message", (topic, message) => {
        onMessageReceived(topic, message);
      });
      console.log("Subscribed to topic: " + topic);
    });
  }
});

function onMessageReceived(topic, message) {
  const parsedMessage = message.toString();
  object = JSON.parse(parsedMessage);
  temperature = JSON.stringify(object);
  temperatura = JSON.stringify(object.temperature);
  axios
    .post("http://localhost:5000/api/v1/temperatures", object, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response)
    .catch((error) => {
      console.error(error);
    });
}

module.exports.temperatura = this.temperatura;
