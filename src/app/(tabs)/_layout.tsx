import { Ionicons } from '@react-native-vector-icons/ionicons';
import { Tabs } from 'expo-router';
import { FC } from 'react';

import { PrimaryColor, TintColor } from '@/constants/theme';

const TabLayout: FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: TintColor.WHITE,
        headerStyle: { backgroundColor: '#25292e' },
        tabBarActiveTintColor: PrimaryColor.DEFAULT,
        tabBarInactiveTintColor: TintColor.WHITE,
        tabBarStyle: { backgroundColor: '#25292e' },
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
  );
};

export default TabLayout;
