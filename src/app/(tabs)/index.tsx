import { FC, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Clock, ClockSettingsForm } from '@/components';
import { ButtonUI, SpinnerUI, StackUI, TextUI } from '@/components/ui';
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StackUI
        style={[
          styles.container,
          { paddingTop: insets.top - 40, paddingBottom: insets.bottom },
        ]}
      >
        {isSensorsDataLoading && (
          <StackUI style={styles.spinnerContainer}>
            <SpinnerUI size={80} />
            <TextUI>Получение данных...</TextUI>
          </StackUI>
        )}

        {sensorsData && !isSensorsDataLoading && (
          <GestureDetector gesture={reloadScreen}>
            <KeyboardAwareScrollView>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <StackUI style={styles.body} spacing={4}>
                  <StackUI>
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
              </ScrollView>
            </KeyboardAwareScrollView>
          </GestureDetector>
        )}
      </StackUI>
    </GestureHandlerRootView>
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
  body: {
    paddingBottom: 20,
  },
});
