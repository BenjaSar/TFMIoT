/**#################################################################################
  Development based on working of 
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp32-mqtt-publish-bme280-arduino/
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
** #################################################################################
*/

#include <Wire.h>
#include <WiFi.h>
extern "C" {
  #include "freertos/FreeRTOS.h"
  #include "freertos/timers.h"
}
#include <Arduino.h>
#include <ArduinoJson.h>    
#include <AsyncMqttClient.h>
#include "driver/rtc_io.h"
#include "esp_timer.h"

//Open, read and write sdCard
#include "sdcard.h"

//File that contains the credentials and MQTT HOST AND PORT
#include "credentials.h"

//File that contains constants values
#include "constantsValues.h"

// Variables to hold sensor readings
int potValue = 0;
float Vcc = 3.5;

//Set state of led
int ledState = LOW;

//volatile int interruptCounterHHol
//int totalInterruptCounter = 0;
byte mac[6];

//hw_timer_t * timer = NULL;
//portMUX_TYPE timerMux = portMUX_INITIALIZER_UNLOCKED;
 
AsyncMqttClient mqttClient;
TimerHandle_t mqttReconnectTimer;
TimerHandle_t wifiReconnectTimer;

unsigned long previousMillis = 0;   // Stores last time temperature was published
const long interval = 10000;        // Interval at which to publish sensor readings

/**
 * @brief Function for indicating that the wifi connection has been established
 * 
 */
void connectToWifi() {
  Serial.println("Connecting to Wi-Fi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}

/**
 * @brief Function for connecting to mqtt broker
 * 
 */
void connectToMqtt() {
  mqttClient.connect();
}

/**
 * @brief Function for indicating differents states during wifi connection
 * 
 * @param event 
 */
void WiFiEvent(WiFiEvent_t event) {
  switch(event) {
    case SYSTEM_EVENT_STA_GOT_IP:
      Serial.println("WiFi connected");
      Serial.println("IP address: ");
      Serial.println(WiFi.localIP());
      connectToMqtt();
      break;
    case SYSTEM_EVENT_STA_DISCONNECTED:
      Serial.println("WiFi lost connection");
      xTimerStop(mqttReconnectTimer, 0); // ensure we don't reconnect to MQTT while reconnecting to Wi-Fi
      xTimerStart(wifiReconnectTimer, 0);
      break;
  }
}

/**
 * @brief Function for indicating that the client has been connected to server
 * 
 * @param sessionPresent 
 */
void onMqttConnect(bool sessionPresent) {
}

/**
 * @brief  Function for indicating that client has been connected from server
 * 
 * @param reason 
 */
void onMqttDisconnect(AsyncMqttClientDisconnectReason reason) {
   Serial.println("Disconnected from MQTT.");
    if (WiFi.isConnected()) {
    xTimerStart(mqttReconnectTimer, 0);
  }
}

/*void IRAM_ATTR onTimer() {
  portENTER_CRITICAL_ISR(&timerMux);
  interruptCounter++;
  potValue = analogRead(potPin);
  temp = (Vcc*potValue)/4095;
           if (ledState == LOW) {
        ledState= HIGH;
        digitalWrite(ledPin, HIGH);
      } else{
        ledState = LOW;
        digitalWrite(ledPin, LOW);
      }
  portEXIT_CRITICAL_ISR(&timerMux);
}*/
/**
 * @brief Function for publishing on broker mosquitto
 * 
 * @param packetId 
 */
void onMqttPublish(uint16_t packetId) {
}

void setup() {
  Serial.begin(115200);
  Serial.println();
  // Initialize pin led
  pinMode(ledPin, OUTPUT); 

  /**
   * @brief Interruption which enabling the GPIO 13
   * 
   */
 // esp_sleep_enable_ext0_wakeup((gpio_num_t)wakeUp_pin, 0);   
   
  //Timer configuration 
    /*timer = timerBegin(0, 80, true);
  timerAttachInterrupt(timer, &onTimer, true);
  timerAlarmWrite(timer, 10000, true);
  timerAlarmEnable(timer);*/
  mqttReconnectTimer = xTimerCreate("mqttTimer", pdMS_TO_TICKS(2000), pdFALSE, (void*)0,reinterpret_cast<TimerCallbackFunction_t>(connectToMqtt));
  wifiReconnectTimer = xTimerCreate("wifiTimer", pdMS_TO_TICKS(2000), pdFALSE, (void*)0, reinterpret_cast<TimerCallbackFunction_t>(connectToWifi));

  WiFi.onEvent(WiFiEvent);

  mqttClient.onConnect(onMqttConnect);
  mqttClient.onDisconnect(onMqttDisconnect);

  mqttClient.onPublish(onMqttPublish);
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  //Authentication of user for the mosquitto
  mqttClient.setCredentials(MQTT_USER, MQTT_PASSWORD);
  initSD();
  //Write the  labels of the readings
  SDwriteDataLabels();
  //Invoke function to connect to wifi network
  connectToWifi();
  /*Go to sleep now
  Serial.println("Going to sleep now") ;
  delay(30000);
  esp_deep_sleep_start(); 
  Serial.println("This will never be printed");*/
}

void loop() {
  /**
   * @brief Every X number of seconds (interval = 10 seconds) 
   * it publishes a new MQTT message
   */
  unsigned long currentMillis = millis();
  //portEXIT_CRITICAL(&timerMux);
    if (currentMillis - previousMillis >= interval) {
      // Save the last time a new reading was published
      previousMillis = currentMillis;
      
      //Reading MacAddress
       WiFi.macAddress(mac);
      String uniq =  String(mac[0],HEX) +String(mac[1],HEX) +String(mac[2],HEX) +String(mac[3],HEX) + String(mac[4],HEX) + String(mac[5],HEX);

      
      // Reading potentiometer value
      potValue = analogRead(potPin);
      temp = (Vcc*potValue)/4095;
      if(temp>2.5){
       /**
        * @brief  Publish an MQTT message on topic esp32/temperature
        * 
        */
      String JSON_str = "{\"temperature\": ";
      JSON_str.concat(temp);
      JSON_str.concat(",  \"idsensors\": ");
      JSON_str.concat("\"");
      JSON_str.concat(uniq);
      JSON_str.concat("\"");
      JSON_str.concat("}"); 
      uint16_t packetIdPub = mqttClient.publish(MQTT_PUB_TEMP, 1, true, JSON_str.c_str());                            
      Serial.printf("Publishing on topic %s at QoS 1, packetId: %i\n",  MQTT_PUB_TEMP, packetIdPub);
      Serial.printf("Message: %.2f \n", temp);
      
      //Logging of lecture of temperatures
      logSDCard();
      if (ledState == LOW) {
        ledState= HIGH;
        digitalWrite(ledPin, HIGH);
      } else{
        ledState = LOW;
        digitalWrite(ledPin, LOW);
      }
    }
  }
}
