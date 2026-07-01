import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SettingsForm } from '@/components';
import { SpinnerUI, StackUI, TextUI } from '@/components/ui';
import { useAppSelector, useSettingsGet } from '@/hooks';
import { settingsSelector } from '@/redux/settings';

const SettingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const settings = useAppSelector(settingsSelector);
  const { handleSettingsGetting, isSettingsLoading } = useSettingsGet();

  useEffect(() => {
    handleSettingsGetting();
  }, [handleSettingsGetting]);

  return (
    <StackUI
      style={[
        styles.container,
        { paddingTop: insets.top - 40, paddingBottom: insets.bottom },
      ]}
    >
      {isSettingsLoading && (
        <StackUI style={styles.spinnerContainer}>
          <SpinnerUI size={80} />
          <TextUI>Получение настроек...</TextUI>
        </StackUI>
      )}

      {settings && !isSettingsLoading && <SettingsForm settings={settings} />}
    </StackUI>
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
