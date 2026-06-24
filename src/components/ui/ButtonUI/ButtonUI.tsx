import { Button, ButtonProps, Host, Text } from '@expo/ui/jetpack-compose';
import { FC } from 'react';
import { StyleSheet } from 'react-native';

export const ButtonUI: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Host style={{ flex: 1, height: 60 }}>
      <Button {...rest}>
        <Text style={styles.text}>{children}</Text>
      </Button>
    </Host>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
