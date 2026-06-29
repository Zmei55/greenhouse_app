import { FC, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Clock, ClockSettingsForm } from '@/components';
import { ButtonUI, StackUI, TextUI } from '@/components/ui';
import { PrimaryColor } from '@/constants/theme';
import { useSensorsDataGet } from '@/hooks';

const Index: FC = () => {
  const insets = useSafeAreaInsets();
  const { handleSensorsDataGetting, sensorsData, isSensorsDataLoading } =
    useSensorsDataGet();

  const [showClockSettings, setShowClockSettings] = useState<boolean>(false);

  useEffect(() => {
    handleSensorsDataGetting();
  }, [handleSensorsDataGetting]);

  const handleSwipeData = (translationY: number) => {
    if (translationY > 200) {
      handleSensorsDataGetting();
    }
  };

  const reloadScreen = Gesture.Pan()
    .activeOffsetY(10)
    .runOnJS(true) // <-- Указывает Gesture Handler выполнять колбэки в JS, а не на UI
    .onUpdate(event => {
      // Вызываем как обычную функцию, scheduleOnRN / runOnJS больше не нужны
      handleSwipeData(event.translationY);
    });

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top - 40, paddingBottom: insets.bottom },
      ]}
    >
      <GestureDetector gesture={reloadScreen}>
        <ScrollView>
          {isSensorsDataLoading && (
            <StackUI style={styles.spinnerContainer}>
              <ActivityIndicator size={80} color={PrimaryColor.DEFAULT} />
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
                    ? parseFloat(sensorsData.temperature).toFixed(1) +
                      ' \u00B0C'
                    : 'Данных нет...'}
                </TextUI>
              </StackUI>
            </StackUI>
          )}
        </ScrollView>
      </GestureDetector>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  /** Контейнер страницы */
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  /** Контейнер для спинера */
  spinnerContainer: {
    flex: 1,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
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
