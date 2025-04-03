#ifndef __DISPLAY__H
#define __DISPLAY__H
#include <Arduino.h>

void initLCD();
void showDisplay(const char* code);
void waitingDisplay();

#endif