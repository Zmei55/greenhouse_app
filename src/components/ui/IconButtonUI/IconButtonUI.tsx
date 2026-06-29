import { Host, IconButton, IconButtonProps } from '@expo/ui/jetpack-compose';
import {
  Ionicons,
  IoniconsIconName,
} from '@react-native-vector-icons/ionicons';

interface IconButtonUIProps extends Omit<IconButtonProps, 'children'> {
  ioniconsName: IoniconsIconName;
  iconsSize?: number;
}

export const IconButtonUI: React.FC<IconButtonUIProps> = ({
  ioniconsName,
  iconsSize = 24,
  ...rest
}) => {
  return (
    <Host matchContents>
      <IconButton onClick={rest.onClick}>
        <Ionicons
          name={ioniconsName}
          color={rest.colors?.contentColor}
          size={iconsSize}
        />
      </IconButton>
    </Host>
  );
};
