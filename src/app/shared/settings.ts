import { Injectable } from '@angular/core';

@Injectable()
export class Settings {
  forecastIoApiKey: string;
  googleClientId: string;
  googleApiKey: string;
  timeTable: Array<Array<string>> = [
    [],
    ["Mathe", "Sport", "Religon", "Englisch"],
    ["Biologie", "Deutsch", "SoWi", "Musik", "Kunst"],
    ["Englisch", "Kunst", "Instrument", "Sport", "Deutsch"],
    ["MINT", "Musik", "Mathe", "Religion", "Klassenleiterst."],
    ["Erdkunde", "Deutsch", "Englisch", "Biologie", "Sport"],
    []
  ];
  classDurationNumbers = [
    [[8, 0], [9, 0]],
    [[9, 10], [10, 10]],
    [[10, 25], [11, 25]],
    [[11, 35], [12, 35]],
    [[12, 50], [13, 50]]
  ];
}

