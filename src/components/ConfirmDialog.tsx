// src/components/ConfirmDialog.tsx
import React from 'react';
import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  message: string;
  onConfirm: () => void;
}

export default function ConfirmDialog({ visible, onDismiss, title, message, onConfirm }: Props) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        {title ? <Dialog.Title>{title}</Dialog.Title> : null}
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onConfirm}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}


// src/components/ConfirmDialog.tsx
/*import React from 'react';
import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  message: string;
  onConfirm: () => void;
}

export default function ConfirmDialog({ visible, onDismiss, title, message, onConfirm }: Props) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        {title ? <Dialog.Title>{title}</Dialog.Title> : null}
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onConfirm}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
*/