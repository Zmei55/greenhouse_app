/**
 * @author Andrei
 * @description Файл хранения типов основных данных приложения
 * Приложение - приложение, установленной на мобильное устройство, управляет настройками "Устройства"
 * Устройство - прибор, который находится в теплице и регулирует её работу
 */

/** Тип состояния основных данных приложения */
export type AppStateType = LoginResponseType & {
  deviceDateTime: string | null;
  error: string | null;
};

/** Тип ответа, которое получает приложение, если оно подключилось к устройству */
export type LoginResponseType = {
  isLogged: boolean;
};

/** Данные сенсоров, получаемые сразу при входе в приложение. Эти данные получаются, если включен соответствующий датчик */
export type AllSensorsDataType = {
  soilMoisture: number | null;
  temperature: string | null;
  deviceDateTime: string | null;
};
