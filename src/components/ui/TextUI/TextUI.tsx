import { TintColor } from '@/constants/theme';
import { StyleSheet, Text, TextProps } from 'react-native';

interface TextUIProps extends TextProps {
  variant?: 'default' | 'title' | 'subtitle' | 'caption';
  textColor?: 'default' | 'error' | 'white' | 'disabled';
  italic?: boolean;
  bold?: boolean;
}

export const TextUI: React.FC<TextUIProps> = ({
  children,
  style,
  variant = 'default',
  textColor = 'default',
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
        variant === 'caption' && styles.caption,
        textColor === 'default' && { color: TintColor.DEFAULT },
        textColor === 'white' && { color: TintColor.DISABLED },
        textColor === 'error' && { color: TintColor.ERROR },
        textColor === 'disabled' && { color: TintColor.WHITE },
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
  text: {},
  default: { fontSize: 20 },
  subtitle: { fontSize: 28 },
  title: { fontSize: 36 },
  caption: { fontSize: 14 },
});
