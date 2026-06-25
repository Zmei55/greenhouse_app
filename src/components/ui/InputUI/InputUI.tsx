import { PrimaryColor } from '@/constants/theme';
import {
  Host,
  OutlinedTextField,
  OutlinedTextFieldProps,
  useNativeState,
} from '@expo/ui/jetpack-compose';
import { border } from '@expo/ui/jetpack-compose/modifiers';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { StackUI } from '../StackUI';
import { TextUI } from '../TextUI';

interface InputProps<T extends FieldValues> extends OutlinedTextFieldProps {
  name: Path<T>;
  label?: string;
  control?: Control<T>;
  required?: boolean;
}

export function InputUI<T extends FieldValues>({
  name,
  label,
  control,
  required = false,
  ...rest
}: InputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <StackUI>
      {label && (
        <StackUI direction="row" spacing={2}>
          <TextUI>{label}</TextUI>
          <TextUI>*</TextUI>
        </StackUI>
      )}
      <Host style={{ flex: 1, height: 60 }}>
        <OutlinedTextField
          value={useNativeState(field.value)}
          onValueChange={field.onChange}
          textStyle={styles.textInput}
          modifiers={[border(1, PrimaryColor.DEFAULT)]}
          {...rest}
        />
      </Host>
      {error && (
        <TextUI variant="caption" textColor="error">
          {error.message}
        </TextUI>
      )}
    </StackUI>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 24,
  },
});
