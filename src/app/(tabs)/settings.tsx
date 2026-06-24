import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsForm } from '@/components';
import { StackUI, TextUI } from '@/components/ui';
import { useAppSelector, useSettingsGet } from '@/hooks';
import { isSettingsLoadingSelector, settingsSelector } from '@/redux/settings';

const SettingsScreen: React.FC = () => {
  const settings = useAppSelector(settingsSelector);
  const isSettingsLoading = useAppSelector(isSettingsLoadingSelector);
  const { handleSettingsGetting } = useSettingsGet();

  useEffect(() => {
    handleSettingsGetting();
  }, [handleSettingsGetting]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {isSettingsLoading && (
          <StackUI>
            <TextUI>Получение настроек...</TextUI>
          </StackUI>
        )}

        {settings && !isSettingsLoading && <SettingsForm settings={settings} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: -20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
