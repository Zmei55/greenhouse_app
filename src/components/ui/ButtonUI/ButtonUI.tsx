import { Button, ButtonProps, Host, Text } from '@expo/ui/jetpack-compose';
import { StyleSheet } from 'react-native';

import { ButtonColor, TintColor } from '@/constants/theme';

interface ButtonUIProps extends ButtonProps {
  type?: 'default' | 'error' | 'warning';
}

export const ButtonUI: React.FC<ButtonUIProps> = ({
  children,
  type = 'default',
  ...rest
}) => {
  return (
    <Host style={{ flex: 1, height: 60 }}>
      <Button
        colors={{
          containerColor:
            type === 'error'
              ? ButtonColor.ERROR
              : type === 'warning'
                ? ButtonColor.WARNING
                : ButtonColor.PRIMARY,
          contentColor: TintColor.WHITE,
        }}
        {...rest}
      >
        <Text style={styles.text}>{children}</Text>
      </Button>
    </Host>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
});
