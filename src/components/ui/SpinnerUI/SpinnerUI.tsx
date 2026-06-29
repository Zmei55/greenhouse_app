import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { PrimaryColor } from '@/constants/theme';

export const SpinnerUI: React.FC<ActivityIndicatorProps> = () => {
  return <ActivityIndicator size={80} color={PrimaryColor.DEFAULT} />;
};
