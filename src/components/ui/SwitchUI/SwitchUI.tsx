import { Host, Switch, SwitchProps } from '@expo/ui/jetpack-compose';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { PrimaryColor } from '@/constants/theme';

type OptionalField = Partial<Pick<SwitchProps, 'value'>>; // выбрали одно поле и сделали его необязательным { value?: boolean }
type RestFields = Omit<SwitchProps, 'value'>; // исключили обязательное поле из оригинального типа
type NewSwitchProps = OptionalField & RestFields; // объединили измененные типы

interface SwitchUIProps<T extends FieldValues> extends NewSwitchProps {
  name: Path<T>;
  control?: Control<T>;
}

export function SwitchUI<T extends FieldValues>({
  name,
  control,
  ...rest
}: SwitchUIProps<T>) {
  const { field } = useController({ name, control });

  return (
    <Host matchContents>
      <Switch
        value={field.value}
        onCheckedChange={field.onChange}
        colors={{
          checkedThumbColor: PrimaryColor.DEFAULT,
          checkedTrackColor: PrimaryColor.DISABLED,
          uncheckedThumbColor: PrimaryColor.DISABLED,
        }}
        {...rest}
      />
    </Host>
  );
}

// export const SwitchUI: FC<SwitchProps> = ({
//   value,
//   onCheckedChange,
//   ...rest
// }) => {
//   return (
//     <Host matchContents>
//       <Switch
//         value={value}
//         onCheckedChange={onCheckedChange}
//         colors={{
//           checkedThumbColor: PrimaryColor.DEFAULT,
//           checkedTrackColor: PrimaryColor.DISABLED,
//           uncheckedThumbColor: PrimaryColor.DISABLED,
//         }}
//         {...rest}
//       />
//     </Host>
//   );
// };
