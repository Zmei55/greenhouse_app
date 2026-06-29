import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Tabs } from 'expo-router';
import { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { ModalUI, StackUI, TextUI } from '@/components/ui';
import { PrimaryColor, TintColor } from '@/constants/theme';
import { useAppDispatch, useAppSelector, useLogin } from '@/hooks';
import { errorReset, errorSelector, isLoggedSelector } from '@/redux/app';

const TabLayout: FC = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(isLoggedSelector);
  const errorApp = useAppSelector(errorSelector);
  const { handleLogin, isLoginLoading } = useLogin();

  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isLogged) {
      handleLogin();
    }
  }, [isLogged, handleLogin]);

  useEffect(() => {
    if (errorApp) setIsErrorModalVisible(true);
  }, [errorApp]);

  /**
   * Вызывается при закрытии модального окна ошибок "приложения"
   * - очищает состояние ошибки
   * - закрывает модальное окно
   */
  function onErrorModalClose() {
    dispatch(errorReset());
    setIsErrorModalVisible(false);
  }

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

      {errorApp && (
        <ModalUI isVisible={isErrorModalVisible} onClose={onErrorModalClose}>
          <StackUI style={styles.errorContainer}>{errorApp}</StackUI>
        </ModalUI>
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
  errorContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
