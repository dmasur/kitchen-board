import { Injectable } from '@angular/core';

@Injectable()
export class Settings {
  forecastIoApiKey: string;
  googleClientId: string;
  googleApiKey: string;
  cameraIp: string;
  cameraUsername: string;
  cameraPassword: string;
  weatherCity: string;
  weatherLongitude: string;
  weatherLatitude: string;
  enableSchedule = true;
  enableHumidor = true;
  timeTable: Array<Array<string>> = [
    ['', '', '', '', ''],
    ['Mathe', 'Sport', 'Religon', 'Englisch', ''],
    ['Biologie', 'Deutsch', 'SoWi', 'Musik', 'Kunst'],
    ['Englisch', 'Kunst', 'Instrument', 'Sport', 'Deutsch'],
    ['MINT', 'Musik', 'Mathe', 'Religion', 'Klassenleiterst.'],
    ['Erdkunde', 'Deutsch', 'Englisch', 'Biologie', 'Sport'],
    ['', '', '', '', '']
  ];
  classDurationNumbers = [
    [[8, 0], [9, 0]],
    [[9, 10], [10, 10]],
    [[10, 25], [11, 25]],
    [[11, 35], [12, 35]],
    [[12, 50], [13, 50]]
  ];
  firebaseUrl = 'https://testproject-91ab2.firebaseio.com/5c:cf:7f:8b:61:6f/latest.json';
}

