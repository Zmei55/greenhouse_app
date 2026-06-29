import { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Clock, ClockSettingsForm } from '@/components';
import { ButtonUI, StackUI, TextUI } from '@/components/ui';
import { useSensorsDataGet } from '@/hooks';

const Index: FC = () => {
  const { handleSensorsDataGetting, sensorsData, isSensorsDataLoading } =
    useSensorsDataGet();
  const [showClockSettings, setShowClockSettings] = useState<boolean>(false);

  useEffect(() => {
    handleSensorsDataGetting();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {isSensorsDataLoading && (
          <StackUI>
            <TextUI>Получение данных...</TextUI>
          </StackUI>
        )}

        {sensorsData && !isSensorsDataLoading && (
          <StackUI spacing={4}>
            <StackUI style={styles.clockContainer}>
              <>
                <StackUI alignItems="center">
                  <Clock />
                </StackUI>

                {!showClockSettings && (
                  <ButtonUI onClick={() => setShowClockSettings(true)}>
                    Изменить
                  </ButtonUI>
                )}

                {showClockSettings && (
                  <ClockSettingsForm
                    setShowClockSettings={setShowClockSettings}
                  />
                )}
              </>
            </StackUI>

            <StackUI>
              <TextUI>Влажность почвы:</TextUI>
              <TextUI>
                {sensorsData.soilMoisture
                  ? sensorsData.soilMoisture
                  : 'Данных нет...'}
              </TextUI>
            </StackUI>

            <StackUI>
              <TextUI>Температура воздуха:</TextUI>
              <TextUI>
                {sensorsData.temperature
                  ? parseFloat(sensorsData.temperature).toFixed(1) + ' \u00B0C'
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
  clockContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  clock: {
    fontSize: 80,
  },
});
