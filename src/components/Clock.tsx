import dayjs from 'dayjs';

import { TextUI } from '@/components/ui';
import { useAppSelector, useDateTimeFormat } from '@/hooks';
import { deviceDateTimeSelector } from '@/redux/app';

export const Clock: React.FC = () => {
  const deviceDateTime = useAppSelector(deviceDateTimeSelector);
  useDateTimeFormat(deviceDateTime);

  const formattedTime = deviceDateTime
    ? dayjs(deviceDateTime).format('HH:mm')
    : 'Время устройства не установлено...';

  return <TextUI style={{ fontSize: 80 }}>{formattedTime}</TextUI>;
};
