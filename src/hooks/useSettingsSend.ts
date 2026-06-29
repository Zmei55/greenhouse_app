import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { errorSave } from '@/redux/app';
import { isSettingsLoadingSave, settingsSave } from '@/redux/settings';
import { useSendSettingsMutation } from '@/redux/settings/settings.api';
import { SettingsFormType, SettingsType } from '@/types/settings.types';

export const useSettingsSend = () => {
  const dispatch = useAppDispatch();
  const [send, { isLoading }] = useSendSettingsMutation();

  useEffect(() => {
    dispatch(isSettingsLoadingSave(isLoading));
  }, [dispatch, isLoading]);

  async function handleSettingsSending(data: SettingsFormType) {
    /** Создаём новый объект настроек. Строки (необходимые для формы) возвращаем к цифрам */
    const dataWithoutSpaces: SettingsType = {
      sensors: {
        soilMoisture: data.soilMoisture,
        photo: data.photo,
        temperature: data.temperature,
      },
      controlTemperature: Number(data.controlTemperature.trim()),
      controlTime: Number(data.controlTime.trim()),
      runningTime: Number(data.runningTime.trim()),
      watering: {
        waterPressure: Number(data.waterPressure.trim()),
        soil: {
          dry: Number(data.soilDry.trim()),
          wet: Number(data.soilWet.trim()),
        },
      },
      workingHours: {
        isEnabled: data.workingHoursAktive,
        start:
          data.startHour && data.startMinute
            ? {
                hour: Number(data.startHour.trim()),
                minute: Number(data.startMinute.trim()),
              }
            : null,
        end:
          data.endHour && data.endMinute
            ? {
                hour: Number(data.endHour.trim()),
                minute: Number(data.endMinute.trim()),
              }
            : null,
      },
    };

    try {
      const res = await send(dataWithoutSpaces).unwrap();
      dispatch(settingsSave(res));
    } catch {
      dispatch(
        errorSave(
          'При попытке сохранить настройки устройства, произошла ошибка'
        )
      );
    }
  }

  return { handleSettingsSending };
};
