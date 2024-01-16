import { FC } from 'react';
import { Modal, Button, ModalContent, ModalBody, ModalFooter } from '@nextui-org/react';

type Props = {
  isOpen: boolean;
  content: string;
  subContent?: string;
  onAction: () => void;
  onOpenChange: () => void;
};

const ModalComponent: FC<Props> = ({ isOpen, content, subContent, onOpenChange, onAction }) => {
  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody
              style={{
                textAlign: 'center',
                color: '#262728',
                fontSize: 26,
                fontWeight: 400,
                lineHeight: 40,
              }}
            >
              <p>{content}</p>
              <p
                style={{
                  color: '#46484b',
                  fontSize: 18,
                  fontWeight: 400,
                }}
              >
                {subContent}
              </p>
            </ModalBody>
            <ModalFooter style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <Button
                style={{
                  height: 48,
                  fontSize: 16,
                  lineHeight: 24,
                  fontWeight: 400,
                  borderRadius: 24,
                  color: '#161717',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #1C1D1D',
                }}
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                style={{
                  height: 48,
                  fontSize: 16,
                  lineHeight: 24,
                  fontWeight: 400,
                  borderRadius: 24,
                  color: '#F9FAFB',
                  backgroundColor: '#1C1D1D',
                }}
                onPress={onAction}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
