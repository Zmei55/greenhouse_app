import { TintColor } from '@/constants/theme';
import { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

interface TextUIProps extends TextProps {
  variant?: 'default' | 'title' | 'subtitle';
  italic?: boolean;
  bold?: boolean;
}

export const TextUI: FC<TextUIProps> = ({
  children,
  style,
  variant = 'default',
  italic = false,
  bold = false,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        variant === 'default' && styles.default,
        variant === 'subtitle' && styles.subtitle,
        variant === 'title' && styles.title,
        italic ? { fontStyle: 'italic' } : undefined,
        bold ? { fontWeight: 'bold' } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: { color: TintColor.DEFAULT },
  default: { fontSize: 20 },
  subtitle: { fontSize: 28 },
  title: { fontSize: 36 },
});
