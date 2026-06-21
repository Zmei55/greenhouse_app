import { Link } from 'expo-router';
import { FC } from 'react';
import { Text, View } from 'react-native';

const Index: FC = () => {
  return (
    <View>
      <Text>Теплица</Text>
      <Link href="/settings">К настройкам</Link>
    </View>
  );
};

export default Index;
