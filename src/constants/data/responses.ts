import { AllSensorsDataType } from '@/types';
import { SettingsType } from '@/types/settings.types';

export const allSensorsResponse: AllSensorsDataType = {
  // soilMoisture: null,
  // temperature: null,
  // deviceDateTime: null,
  soilMoisture: 4095,
  temperature: '29.159',
  deviceDateTime: '2026-01-01T12:03:55',
};

export const allSettingsResponse: SettingsType = {
  sensors: {
    soilMoisture: false,
    photo: false,
    temperature: false,
  },
  controlTemperature: 24,
  controlTime: 1,
  runningTime: 5,
  watering: {
    waterPressure: 100,
    soil: {
      dry: 3500,
      wet: 2920,
    },
  },
  workingHours: {
    isEnabled: false,
    start: null,
    end: null,
  },
  // workingHours: {
  //   isEnabled: true,
  //   start: {
  //     hour: 8,
  //     minute: 0,
  //   },
  //   end: {
  //     hour: 21,
  //     minute: 0,
  //   },
  // },
};
