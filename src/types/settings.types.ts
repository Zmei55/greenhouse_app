/**
 * @author Andrei
 * @description Файл хранения типов связанных с настройками устройства
 */

/** Тип состояния настроек */
export type SettingsStateType = {
  settings: SettingsType | null;
  isSettingsLoading: boolean;
};

/** Тип ответа на запрос установленных настроек устройства */
export type SettingsType = {
  sensors: SensorsSettingsType;
  controlTemperature: number;
  controlTime: number;
  runningTime: number;
  watering: WateringSettingsType;
  workingHours: WorkingHoursSettingsType;
};

/** Тип формы для отправки настроек на устройство */
export type SettingsFormType = SensorsSettingsType &
  WateringFormType &
  WorkingHoursFormType & {
    controlTemperature: string;
    controlTime: string;
    runningTime: string;
  };

/** Какие датчики активны */
type SensorsSettingsType = {
  soilMoisture: boolean;
  photo: boolean;
  temperature: boolean;
};

/** Настройки полива */
type WateringSettingsType = {
  waterPressure: number;
  soil: SoilSettingsType;
};

/** Настройки сухости почвы */
type SoilSettingsType = {
  dry: number;
  wet: number;
};

/** Настройки рабочего времени */
type WorkingHoursSettingsType = {
  isEnabled: boolean;
  start: TimeType | null;
  end: TimeType | null;
};

type TimeType = {
  hour: number;
  minute: number;
};

/** Настройки полива для формы */
type WateringFormType = {
  waterPressure: string;
  soilDry: string;
  soilWet: string;
};

/** Настройки рабочего времени для формы */
type WorkingHoursFormType = {
  workingHoursAktive: boolean;
  startHour: string | null;
  startMinute: string | null;
  endHour: string | null;
  endMinute: string | null;
};
