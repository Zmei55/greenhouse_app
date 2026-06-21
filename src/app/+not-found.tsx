import { Link, Stack } from 'expo-router';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

const NotFoundScreen: FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Уупс! Не найдено' }} />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          Назад
        </Link>
      </View>
    </>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
