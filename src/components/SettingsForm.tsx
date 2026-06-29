import { router } from 'expo-router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { ButtonUI, InputUI, StackUI, SwitchUI, TextUI } from '@/components/ui';
import { useSettingsSend } from '@/hooks';
import { SettingsFormType, SettingsType } from '@/types/settings.types';

interface SettingsFormProps {
  settings: SettingsType;
}

export const SettingsForm: FC<SettingsFormProps> = ({ settings }) => {
  const { handleSettingsSending } = useSettingsSend();

  /** Инициализируем форму. Цифры приводим к строкам для работы с <Input /> */
  const { control, handleSubmit } = useForm<SettingsFormType>({
    defaultValues: {
      temperature: settings.sensors.temperature,
      soilMoisture: settings.sensors.soilMoisture,
      photo: settings.sensors.photo,
      controlTemperature: settings.controlTemperature.toString(),
      controlTime: settings.controlTime.toString(),
      runningTime: settings.runningTime.toString(),
      waterPressure: settings.watering.waterPressure.toString(),
      soilDry: settings.watering.soil.dry.toString(),
      soilWet: settings.watering.soil.wet.toString(),
      workingHoursAktive: settings.workingHours.isEnabled,
      startHour: settings.workingHours.start
        ? settings.workingHours.start.hour.toString()
        : null,
      startMinute: settings.workingHours.start
        ? settings.workingHours.start.minute.toString()
        : null,
      endHour: settings.workingHours.end
        ? settings.workingHours.end.hour.toString()
        : null,
      endMinute: settings.workingHours.end
        ? settings.workingHours.end.minute.toString()
        : null,
    },
  });

  return (
    <StackUI spacing={6}>
      <StackUI style={styles.sensorsContainer}>
        <TextUI variant="subtitle">Датчики:</TextUI>
        <StackUI style={styles.sensor} spacing={2}>
          <TextUI>Термометр:</TextUI>
          <SwitchUI<SettingsFormType> name="temperature" control={control} />
        </StackUI>

        <StackUI style={styles.sensor} spacing={2}>
          <TextUI>Влажность воздуха:</TextUI>
          <SwitchUI<SettingsFormType> name="soilMoisture" control={control} />
        </StackUI>

        <StackUI style={styles.sensor} spacing={2}>
          <TextUI>Освещенность:</TextUI>
          <SwitchUI<SettingsFormType> name="photo" control={control} />
        </StackUI>
      </StackUI>

      <StackUI spacing={2}>
        <InputUI<SettingsFormType>
          name="controlTemperature"
          control={control}
          label={'Контрольная температура (\u00B0C):'}
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
        <InputUI<SettingsFormType>
          name="controlTime"
          control={control}
          label="Контрольное время (сек):"
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
        <InputUI<SettingsFormType>
          name="runningTime"
          control={control}
          label="Время работы мотора (сек):"
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
      </StackUI>

      <StackUI>
        <TextUI variant="subtitle">Полив:</TextUI>
        <InputUI<SettingsFormType>
          name="waterPressure"
          control={control}
          label="Давление воды (max: 225):"
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
        <InputUI<SettingsFormType>
          name="soilDry"
          control={control}
          label="Мокрая почва (max: 3500):"
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
        <InputUI<SettingsFormType>
          name="soilWet"
          control={control}
          label="Сухая почва (min: 2920):"
          keyboardOptions={{ keyboardType: 'number' }}
          required
        />
      </StackUI>

      <StackUI>
        <TextUI variant="subtitle">Рабочие часы:</TextUI>
        <StackUI style={styles.sensor} spacing={2}>
          <TextUI>Активно:</TextUI>
          <SwitchUI<SettingsFormType>
            name="workingHoursAktive"
            control={control}
          />
        </StackUI>

        {settings.workingHours.isEnabled && (
          <StackUI>
            <StackUI>
              <TextUI>Начало:</TextUI>
              {settings.workingHours.start && (
                <StackUI direction="row" spacing={2} alignItems="center">
                  <InputUI<SettingsFormType>
                    name="startHour"
                    control={control}
                    keyboardOptions={{ keyboardType: 'number' }}
                  />
                  <TextUI variant="title">:</TextUI>
                  <InputUI<SettingsFormType>
                    name="startMinute"
                    control={control}
                    keyboardOptions={{ keyboardType: 'number' }}
                  />
                </StackUI>
              )}
            </StackUI>

            <StackUI>
              <TextUI>Окончание:</TextUI>
              {settings.workingHours.end && (
                <StackUI direction="row" spacing={2} alignItems="center">
                  <InputUI<SettingsFormType>
                    name="endHour"
                    control={control}
                    keyboardOptions={{ keyboardType: 'number' }}
                  />
                  <TextUI variant="title">:</TextUI>
                  <InputUI<SettingsFormType>
                    name="endMinute"
                    control={control}
                    keyboardOptions={{ keyboardType: 'number' }}
                  />
                </StackUI>
              )}
            </StackUI>
          </StackUI>
        )}
      </StackUI>

      <StackUI direction="row" spacing={4}>
        <ButtonUI onClick={() => router.back()} type="error">
          Отмена
        </ButtonUI>
        <ButtonUI onClick={handleSubmit(handleSettingsSending)}>
          Сохранить
        </ButtonUI>
      </StackUI>
    </StackUI>
  );
};

const styles = StyleSheet.create({
  sensorsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sensor: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
