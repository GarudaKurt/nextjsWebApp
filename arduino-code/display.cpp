#include "display.h"
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 20, 4);

struct ProductItem {
  const char *ID;
  const char *name;
  int qty;
};

// List of tracked items
ProductItem prodItems[] = {
  {"1001", "Hot Air Gun", 10},
  {"1002", "A-Multi Meter", 10},
  {"1003", "D-Multi Meter", 10},
  {"1004", "Comb Pliers", 10},
  {"1005", "Cutter Pliers", 10},
  {"1006", "Flat Screw", 10},
  {"1007", "Phillips Screw", 10},
  {"1008", "Toolbox Set", 10},
};

int size = sizeof(prodItems) / sizeof(prodItems[0]);

void initLCD() {
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Scanner Ready...");
  delay(2000);
  lcd.clear();
}

void showDisplay(const char* code) {
  bool found = false;

  for (int i = 0; i < size; i++) {
    if (strcmp(code, prodItems[i].ID) == 0) {
      found = true;
      lcd.clear();
      lcd.setCursor(2, 0);
      lcd.print("Tracker Device");

      lcd.setCursor(2, 1);
      lcd.print("ID: ");
      lcd.print(prodItems[i].ID);

      lcd.setCursor(0, 2);
      lcd.print("Name: ");
      lcd.print(prodItems[i].name);

      lcd.setCursor(2, 3);
      lcd.print("QTY: ");
      
      if (prodItems[i].qty > 0) {
        prodItems[i].qty--;  // Decrement quantity
        lcd.print(prodItems[i].qty);
      } else {
        lcd.print("Out of Stock");
      }

      delay(3000);  // Show result for 3 seconds
      lcd.clear();
      return; // Exit function after finding match
    }
  }

  // If no match found, display "Not Found!"
  lcd.clear();
  lcd.setCursor(2, 0);
  lcd.print("Not Found!");
  delay(3000);
  lcd.clear();
  lcd.setCursor(2, 1);
  lcd.print("Scan Product ID");
}

void waitingDisplay() {
  lcd.clear();
  lcd.setCursor(2, 1);
  lcd.print("Inventory Tracker");
  lcd.setCursor(2, 2);
  lcd.print("Scan Product ID");
}
