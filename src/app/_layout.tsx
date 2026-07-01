import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; // Заставка на экране во время загрузки приложения | настройка в app.json
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Провайдер обработчика движений
import { KeyboardProvider } from 'react-native-keyboard-controller'; // Провайдер работы с клавиатурой
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'; // Провайдер состояния(хранение данных) приложения

import { store } from '@/redux/store';

import '@/global.css';

SplashScreen.preventAutoHideAsync(); // Блокируем автоматическое отключение заставки

const RootLayout = () => {
  const [loaded] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync(); // Скрываем заставку, когда шрифты загружены
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <KeyboardProvider statusBarTranslucent={true} preserveEdgeToEdge>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false, statusBarStyle: 'light' }}
              />
            </Stack>
          </KeyboardProvider>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
