import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Tabs } from 'expo-router';
import { FC, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { StackUI, TextUI } from '@/components/ui';
import { PrimaryColor, TintColor } from '@/constants/theme';
import { useAppSelector, useLogin } from '@/hooks';
import { isLoggedSelector } from '@/redux/app';

const TabLayout: FC = () => {
  const isLogged = useAppSelector(isLoggedSelector);
  const { handleLogin, isLoginLoading } = useLogin();

  useEffect(() => {
    if (!isLogged) {
      handleLogin();
    }
  }, [isLogged, handleLogin]);

  return (
    <>
      {!isLogged && isLoginLoading && (
        <StackUI style={styles.container}>
          <TextUI>Поиск теплицы...</TextUI>
        </StackUI>
      )}

      {isLogged && !isLoginLoading && (
        <Tabs
          screenOptions={{
            headerShadowVisible: false,
            headerTintColor: TintColor.WHITE,
            headerStyle: styles.header,
            headerTitleAlign: 'center',
            tabBarActiveTintColor: PrimaryColor.DEFAULT,
            tabBarInactiveTintColor: TintColor.WHITE,
            tabBarStyle: styles.tabBar,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Теплица',
              tabBarLabel: 'Домашняя',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? 'home-sharp' : 'home-outline'}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Настройки',
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? 'settings' : 'settings-outline'}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
        </Tabs>
      )}
    </>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#25292e',
  },
  tabBar: {
    backgroundColor: '#25292e',
  },
});
