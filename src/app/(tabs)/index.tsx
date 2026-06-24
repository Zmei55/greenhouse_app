import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StackUI, TextUI } from '@/components/ui';
import { useGetAllQuery } from '@/redux/app/app.api';

// import { allSensorsResponse as data } from '@/constants/data'; // удалить после завершения разработки

const Clock: FC<{ dateTime: Dayjs }> = ({ dateTime }) => {
  const [time, setTime] = useState<Dayjs>(dateTime);

  useEffect(() => {
    const timerId = setInterval(() => {
      const newTime = time.add(1, 'seconds');
      setTime(newTime);
    }, 1000);

    return () => clearInterval(timerId);
  }, [time]);

  const formattedTime = time.format('HH:mm');

  return <TextUI variant="title">{formattedTime}</TextUI>;
};

const Index: FC = () => {
  const { data, isFetching } = useGetAllQuery();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {isFetching && (
          <StackUI>
            <TextUI>Получение данных...</TextUI>
          </StackUI>
        )}

        {data && !isFetching && (
          <StackUI spacing={4}>
            <StackUI style={styles.watchContainer}>
              <TextUI>
                {data.deviceDateTime ? (
                  <Clock dateTime={dayjs(data.deviceDateTime)} />
                ) : (
                  'Время устройства не установлено...'
                )}
              </TextUI>
            </StackUI>

            <StackUI>
              <TextUI>Влажность почвы:</TextUI>
              <TextUI>
                {data.soilMoisture ? data.soilMoisture : 'Данных нет...'}
              </TextUI>
            </StackUI>

            <StackUI>
              <TextUI>Температура воздуха:</TextUI>
              <TextUI>
                {data.temperature
                  ? parseFloat(data.temperature).toFixed(1) + ' \u00B0C'
                  : 'Данных нет...'}
              </TextUI>
            </StackUI>
          </StackUI>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: -20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  /** Контейнер для часов устройства */
  watchContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
