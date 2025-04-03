#include <Wire.h>
#include <SoftwareSerial.h>
#include "display.h"

#define SCANNER_RX 2
#define SCANNER_TX 3

SoftwareSerial scannerSerial(SCANNER_RX, SCANNER_TX);

void setup() {
  Serial.begin(9600);
  scannerSerial.begin(9600);
  initLCD();
}

void loop() {
    if (scannerSerial.available()) {
      String scannedData = "";
      while (scannerSerial.available()) {
          char c = scannerSerial.read();
          scannedData += c;
          delay(5);
      }
      scannedData.trim();

      //Serial.print("Scanned Code: ");
      Serial.println(scannedData);

      showDisplay(scannedData.c_str());
      delay(3000);
      waitingDisplay();
    }
}
