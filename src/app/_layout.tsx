import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; // Заставка на экране во время зарузки приложения | настройка в app.json
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';

import '@/global.css';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
SplashScreen.preventAutoHideAsync(); // Блокируем автоматическое отключение заставки

const RootLayout = () => {
  const [loaded] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (loaded) SplashScreen.hideAsync(); // Скрываем заставку, когда шрифты загружены
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
