import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; // Заставка на экране во время зарузки приложения | настройка в app.json
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';

import '@/global.css';

SplashScreen.preventAutoHideAsync(); // Блокируем автоматическое отключение заставки

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync(); // Скрываем заставку, когда шрифты загружены
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Теплица' }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
