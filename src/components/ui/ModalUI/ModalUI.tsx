import { FC, PropsWithChildren } from 'react';
import { Modal, StyleSheet } from 'react-native';

import { TintColor } from '@/constants/theme';
import { IconButtonUI } from '../IconButtonUI';
import { StackUI } from '../StackUI';
import { TextUI } from '../TextUI';

interface ModalUIProps extends PropsWithChildren {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}

interface CloseButtonProps {
  onClose: () => void;
}

export const ModalUI: FC<ModalUIProps> = ({
  isVisible,
  onClose,
  title,
  children,
}) => {
  return (
    <StackUI>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        {title && (
          <StackUI style={styles.headerWithTitle}>
            <TextUI variant="title">{title}</TextUI>
            <CloseButton onClose={onClose} />
          </StackUI>
        )}
        {!title && (
          <StackUI style={styles.headerWithoutTitle}>
            <CloseButton onClose={onClose} />
          </StackUI>
        )}
        {children}
      </Modal>
    </StackUI>
  );
};

const CloseButton: FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <IconButtonUI
      ioniconsName="close-outline"
      onClick={onClose}
      colors={{ contentColor: TintColor.ERROR }}
    />
  );
};

const styles = StyleSheet.create({
  headerWithTitle: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerWithoutTitle: {
    justifyContent: 'flex-end',
  },
});
