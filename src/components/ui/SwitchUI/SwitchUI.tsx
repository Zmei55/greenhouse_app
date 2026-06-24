import { Host, Switch, SwitchProps } from '@expo/ui/jetpack-compose';
import { FC } from 'react';

import { PrimaryColor } from '@/constants/theme';

export const SwitchUI: FC<SwitchProps> = ({
  value,
  onCheckedChange,
  ...rest
}) => {
  return (
    <Host matchContents>
      <Switch
        value={value}
        onCheckedChange={onCheckedChange}
        colors={{
          checkedThumbColor: PrimaryColor.DEFAULT,
          checkedTrackColor: PrimaryColor.DISABLED,
          uncheckedThumbColor: PrimaryColor.DISABLED,
        }}
        {...rest}
      />
    </Host>
  );
};
