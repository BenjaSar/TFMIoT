/**
 * Embedded Systems Laboratory - LSE -UBA
 * Authors: FS
 *  Development based on working of:
 *  Rui Santos
 *  Complete project details at https://RandomNerdTutorials.com/esp32-cam-take-photo-save-microsd-card
 * 
*/

#if !defined(SDCARD_H)
#define SDCARD_H

#include "FS.h"                // SD Card ESP32
#include "SD_MMC.h"            // SD Card ESP32

extern void initSD(){

  if(!SD_MMC.begin()){
    Serial.println("SD Card Mount Failed");
    return;
  }
  uint8_t cardType = SD_MMC.cardType();
  if(cardType == CARD_NONE){
    Serial.println("No SD Card attached");
    return;
  }
}
#endif