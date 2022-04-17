#if !defined(CONSTANTS_VALUES_H)
#define CONSTANTS_VALUES_H

// The potentiometer is connected to GPIO 32 (Analog ADC1_CH6) 
const uint8_t AnalogPin = 32;
//Led is connecto to GPIO 33
const uint8_t ledPin = 13;
//Wake up pin
const uint8_t wakeUp_pin = GPIO_NUM_33;
//Struct for pushbutton
struct PushButton
{
    const uint8_t pin;
    bool pressedd;
};
#endif