import { Dispatch, FC, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ButtonUI, InputUI, StackUI } from '@/components/ui';
import { useAppSelector, useDateTimeSend } from '@/hooks';
import { deviceDateTimeSelector } from '@/redux/app';
import { DateTimeFormType } from '@/types';
import dayjs from 'dayjs';

interface ClockSettingsFormProps {
  setShowClockSettings: Dispatch<SetStateAction<boolean>>;
}

export const ClockSettingsForm: FC<ClockSettingsFormProps> = ({
  setShowClockSettings,
}) => {
  const { handleDateTimeSending } = useDateTimeSend();
  const deviceDateTime = useAppSelector(deviceDateTimeSelector);

  const { control, handleSubmit } = useForm<DateTimeFormType>({
    defaultValues: {
      year: dayjs(deviceDateTime).year().toString(),
      month: dayjs(deviceDateTime).month().toString(),
      day: dayjs(deviceDateTime).date().toString(),
      hour: dayjs(deviceDateTime).hour().toString(),
      minute: dayjs(deviceDateTime).minute().toString(),
      second: dayjs(deviceDateTime).second().toString(),
    },
  });

  const onSubmit: SubmitHandler<DateTimeFormType> = data => {
    handleDateTimeSending(data, () => setShowClockSettings(false));
  };

  return (
    <StackUI spacing={4}>
      <StackUI spacing={2}>
        <InputUI<DateTimeFormType>
          name="year"
          control={control}
          label="Год"
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
        <InputUI<DateTimeFormType>
          name="month"
          control={control}
          label="Месяц"
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
        <InputUI<DateTimeFormType>
          name="day"
          control={control}
          label="День"
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
        <InputUI<DateTimeFormType>
          name="hour"
          control={control}
          label="Час"
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
        <InputUI<DateTimeFormType>
          name="minute"
          control={control}
          label="Минута"
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
        <InputUI<DateTimeFormType>
          name="second"
          control={control}
          label="Секунда"
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
      </StackUI>

      <StackUI direction="row" spacing={4}>
        <ButtonUI type="error" onClick={() => setShowClockSettings(false)}>
          Отмена
        </ButtonUI>
        <ButtonUI onClick={handleSubmit(onSubmit)}>Сохранить</ButtonUI>
      </StackUI>
    </StackUI>
  );
};
