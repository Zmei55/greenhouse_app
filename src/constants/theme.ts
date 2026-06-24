/**
 * @author: Andrei
 * @description: Этот файл содержит константы темы оформления для приложения.
 */

import '@/global.css';

import { Platform } from 'react-native';

/** Цвет текста */
export enum TintColor {
  DEFAULT = '#16171D',
  WHITE = '#FFFFFF',
  ERROR = '#EC312F',
  DISABLED = '#AEB1C2',
}

/** Главный цвет приложения */
export enum PrimaryColor {
  DEFAULT = '#115FFD',
  DISABLED = '#1160fd82',
}

/** Цвета кнопок */
export enum ButtonColor {
  PRIMARY = '#115FFD',
  ERROR = '#EC312F',
  WARNING = '#ff6300',
}

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
