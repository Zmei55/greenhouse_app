import dayjs from 'dayjs';
import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deviceDateTimeSave } from '@/redux/app';

/** Преобразование строки даты и времени полученных от устройства к объекту Dayjs, для работы с датой */
export const useDateTimeFormat = (dateTime: string | null) => {
  const dispatch = useAppDispatch();
  const DTForInitForm = dayjs(dateTime);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (DTForInitForm) {
        const newTime = DTForInitForm.add(1, 'second')
          .toISOString()
          .slice(0, 19);
        dispatch(deviceDateTimeSave(newTime));
      }
    }, 1000 * 60);

    return () => clearInterval(timerId);
  }, [DTForInitForm, dispatch]);
};
