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
      <Modal
        animationType="slide"
        visible={isVisible}
        backdropColor={'#0000004d'}
      >
        {title && (
          <StackUI
            style={[styles.modal, styles.header, styles.headerWithTitle]}
          >
            <TextUI variant="title">{title}</TextUI>
            <CloseButton onClose={onClose} />
          </StackUI>
        )}
        {!title && (
          <StackUI
            style={[styles.modal, styles.header, styles.headerWithoutTitle]}
          >
            <CloseButton onClose={onClose} />
          </StackUI>
        )}
        <StackUI style={[styles.modal, styles.body]}>
          {typeof children === 'string' && <TextUI>{children}</TextUI>}
          {typeof children !== 'string' && children}
        </StackUI>
      </Modal>
    </StackUI>
  );
};

const CloseButton: FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <IconButtonUI
      ioniconsName="close-outline"
      onClick={onClose}
      colors={{
        contentColor: TintColor.ERROR,
      }}
    />
  );
};

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    marginTop: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerWithTitle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  headerWithoutTitle: {
    justifyContent: 'flex-end',
  },
  body: {
    paddingBottom: 20,
    paddingLeft: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
