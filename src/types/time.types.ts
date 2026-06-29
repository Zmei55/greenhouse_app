/**
 * @author Andrei
 * @description Файл хранения типов связанных с часами устройства
 */

/** Тип ответа часов */
export type DeviceDateTimeType = {
  deviceDateTime: '2026-01-01T12:11:04';
};

/**
 * Тип настройки часов, отправляемый на устройство
 * @example [год, месяц, день, час, минута, секунда]
 */
export type DateTimeSendType = [number, number, number, number, number, number];

/** Тип формы даты и времени */
export type DateTimeFormType = {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
};
