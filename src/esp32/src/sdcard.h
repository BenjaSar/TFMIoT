/*Module for reading and writting sdcard with esp32
Based on working of Rui Santos
*/

//Libraries for SD Card 
#include "FS.h"
#include "SD.h"
#include <SPI.h>
#include "SD_MMC.h"

// Define CS pin for the SD card module   
#define SD_CS 5

// Save reading number on RTC memory
RTC_DATA_ATTR int readingID = 0;

String dataMessage;
float temp;

// Append data to the SD card (DON'T MODIFY THIS FUNCTION)
void appendFile(fs::FS &fs, const char * path, const char * message) {
  Serial.printf("Appending to file: %s\n", path);

  File file = fs.open(path, FILE_APPEND);
  if(!file) {
    Serial.println("Failed to open file for appending");
    return;
  }
  if(file.print(message)) {
    Serial.println("Message appended");
  } else {
    Serial.println("Append failed");
  }
  file.close();
}

//Initializing the microSD card module
extern void logSDCard(){

  dataMessage = String(readingID) + ","  +  String(temp) + "\r\n";
                
  Serial.print("Save data: ");
  Serial.println(dataMessage);
  appendFile(SD, "/data.txt", dataMessage.c_str());
}
extern void initSD(){
  SD.begin(SD_CS); 
  if(!SD.begin(SD_CS)) {
  Serial.println("Card Mount Failed");
  return;
  }

  uint8_t cardType = SD.cardType();
  if(cardType == CARD_NONE) {
    Serial.println("No SD card attached");
    return;
  }
  Serial.println("Initializing SD card...");
  if (!SD.begin(SD_CS)) {
      Serial.println("ERROR - SD card initialization failed!");
    return; // init failed
    }
  }  


// Write to the SD card (DON'T MODIFY THIS FUNCTION)
  void writeFile(fs::FS &fs, const char * path, const char * message) {
  Serial.printf("Writing file: %s\n", path);

  File file = fs.open(path, FILE_WRITE);
  if(!file) {
    Serial.println("Failed to open file for writing");
    return;
  }
  if(file.print(message)) {
    Serial.println("File written");
  } else {
    Serial.println("Write failed");
  }
  file.close();
  }

  // If the data.txt file doesn't exist
  // Create a file on the SD card and write the data labels
  extern void SDwriteDataLabels(){
    File file = SD.open("/data.txt");
    if(!file) {
      Serial.println("File doens't exist");
      Serial.println("Creating file...");
      writeFile(SD, "/data.txt", "Reading ID, Temperature \r\n");
    } else {
      Serial.println("File already exists");  
    }
    file.close();
  }


  


