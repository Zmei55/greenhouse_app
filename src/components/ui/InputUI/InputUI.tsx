import { PrimaryColor, TintColor } from '@/constants/theme';
import {
  Host,
  OutlinedTextField,
  useNativeState,
} from '@expo/ui/jetpack-compose';
import { border } from '@expo/ui/jetpack-compose/modifiers';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { StackUI } from '../StackUI';
import { TextUI } from '../TextUI';

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  control?: Control<T>;
}

export function InputUI<T extends FieldValues>({
  name,
  label,
  control,
  ...rest
}: InputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <StackUI>
      {label && <TextUI>{label}</TextUI>}
      <Host style={{ flex: 1, height: 60 }}>
        <OutlinedTextField
          value={useNativeState(field.value)}
          onValueChange={field.onChange}
          textStyle={styles.text}
          modifiers={[border(1, PrimaryColor.DEFAULT)]}
          {...rest}
        />
      </Host>
      {error && <TextUI style={styles.errorText}>{error.message}</TextUI>}
    </StackUI>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  errorText: {
    fontSize: 12,
    color: TintColor.ERROR,
  },
});
