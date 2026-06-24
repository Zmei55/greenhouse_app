import { FC } from 'react';
import { FlexAlignType, StyleSheet, View, ViewProps } from 'react-native';

interface StackUIProps extends ViewProps {
  direction?: 'column' | 'row';
  spacing?: number;
  alignItems?: FlexAlignType;
}

export const StackUI: FC<StackUIProps> = ({
  children,
  style,
  direction = 'column',
  spacing,
  alignItems,
  ...rest
}) => {
  return (
    <View
      style={[
        styles.container,
        { flexDirection: direction },
        alignItems ? { alignItems } : undefined,
        spacing ? { gap: spacing * 4 } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
