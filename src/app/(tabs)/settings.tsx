import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SettingsForm } from '@/components';
import { StackUI, TextUI } from '@/components/ui';
import { useAppSelector, useSettingsGet } from '@/hooks';
import { isSettingsLoadingSelector, settingsSelector } from '@/redux/settings';

const SettingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const settings = useAppSelector(settingsSelector);
  const isSettingsLoading = useAppSelector(isSettingsLoadingSelector);
  const { handleSettingsGetting } = useSettingsGet();

  useEffect(() => {
    handleSettingsGetting();
  }, [handleSettingsGetting]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top - 40, paddingBottom: insets.bottom },
        ]}
      >
        <ScrollView>
          {isSettingsLoading && (
            <StackUI style={styles.spinnerContainer}>
              <TextUI>Получение настроек...</TextUI>
            </StackUI>
          )}

          {settings && !isSettingsLoading && (
            <SettingsForm settings={settings} />
          )}
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default SettingsScreen;

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
});
