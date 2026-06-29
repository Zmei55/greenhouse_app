import { useState } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deviceDateTimeSave } from '@/redux/app';
import { useLazyGetAllQuery } from '@/redux/app/app.api';
import { AllSensorsDataType } from '@/types';

export const useSensorsDataGet = () => {
  const dispatch = useAppDispatch();
  const [sensorsData, setSensorsData] = useState<AllSensorsDataType | null>(
    null
  );
  const [getData, { isFetching: isSensorsDataLoading }] = useLazyGetAllQuery();

  async function handleSensorsDataGetting() {
    try {
      const res = await getData().unwrap();
      if (res.deviceDateTime) {
        dispatch(deviceDateTimeSave(res.deviceDateTime));
      }
      setSensorsData(res);
    } catch (error) {
      console.error('useSensorsDataGet', error);
    }
  }

  return { handleSensorsDataGetting, sensorsData, isSensorsDataLoading };
};
