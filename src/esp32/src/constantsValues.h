#if !defined(CONSTANTS_VALUES_H)
#define CONSTANTS_VALUES_H

// Time to sleep in seconds, 1 sec = 10000
#define time_to_sleep 60000

// The sensor is connected to GPIO 32 (Analog ADC1_CH6)
const uint8_t AnalogPin = 32;

// Led is connecto to GPIO 13
const uint8_t ledPin = 13;

int sensorValue = 0;
// Variable to store the conversion of sensorValue
double ValSignal = 0;

// Level for wake up
int level = 1;

// Wake up pin
const uint8_t wakeUp_pin = GPIO_NUM_33;

// Struct for pushbutton
struct PushButton
{
    const uint8_t pin;
    bool pressed;
};
#endif