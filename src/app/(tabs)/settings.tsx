import { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <ScrollView>
        {isSettingsLoading && (
          <StackUI>
            <TextUI>Получение настроек...</TextUI>
          </StackUI>
        )}

        {settings && !isSettingsLoading && <SettingsForm settings={settings} />}
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
