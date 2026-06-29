import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deviceDateTimeSave, errorSave } from '@/redux/app';
import { useSendDeviceDateTimeMutation } from '@/redux/time/time.api';
import { DateTimeFormType, DateTimeSendType } from '@/types';

export const useDateTimeSend = () => {
  const dispatch = useAppDispatch();
  const [sendDateTime] = useSendDeviceDateTimeMutation();

  async function handleDateTimeSending(
    data: DateTimeFormType,
    callback?: () => void
  ) {
    const dateTimeArray: DateTimeSendType = [
      Number(data.year),
      Number(data.month),
      Number(data.day),
      Number(data.hour),
      Number(data.minute),
      Number(data.second),
    ];

    try {
      const res = await sendDateTime(dateTimeArray).unwrap();
      dispatch(deviceDateTimeSave(res.deviceDateTime));
      if (callback) callback();
    } catch {
      dispatch(
        errorSave('При попытке изменить настройку часов, произошла ошибка')
      );
    }
  }

  return { handleDateTimeSending };
};
