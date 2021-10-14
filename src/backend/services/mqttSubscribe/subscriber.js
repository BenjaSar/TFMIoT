/** #################################################################################
# Author:FS
# Date: 2021
# Copyright: Agustin Bassi (https://github.com/agustinBassi/mq-connection)
# License: MIT
# Project: MQTT Suscribe
# Brief: Services to susbcribe to the topic in the mqtt broker.
#################################################################################
 */

const mqtt = require("mqtt");
topic = "esp32/temperature";
//var caFile = fs.readFileSync("ca.crt");
//var KEY = fs.readFileSync("client-certs\\client.key");
//var CERT = fs.readFileSync("client-certs\\client.crt");

var options = {
  clientId: "mqttSuscriber01",
  username: "mqttSuscriber01",
  password: "654321",
  clean: true,
  port: 1883,
  //host: "192.168.0.13",
  //protocol:'mqtts',
  //rejectUnauthorized: false,
  //key: KEY,
  //cert: CERT,
  //ca: caFile,
};

var client = mqtt.connect("mqtt://192.168.0.13:port", options);
//var client = mqtt.connect("mqtt://172.18.0.2:1883", options);
console.log("connected flag  " + client.connected);
client.on("connect", function () {
  console.log("connected  " + client.connected);
});

client.subscribe(topic, function (err, granted) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Subscribed to topic: " + topic);
});
