/**
 * @author: Andrei
 * @description: Этот файл содержит константы темы оформления для приложения.
 */

import '@/global.css';

import { Platform } from 'react-native';

export enum TextColor {
  DEFAULT = '#16171D',
  ERROR = '#EC312F',
  DISABLED = '#AEB1C2',
}

export enum PrimaryColor {
  DEFAULT = '#115FFD',
  DISABLED = '#1160fd82',
}

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
