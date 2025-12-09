// src/components/EmptyState.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';

interface Props {
  onAdd: () => void;
}

export default function EmptyState({ onAdd }: Props) {
  return (
    <View style={styles.container}>
      <Title>No notes yet</Title>
      <Paragraph>Start by creating a note — it will be saved locally.</Paragraph>
      <Button mode="contained" onPress={onAdd} style={styles.button}>
        Add Note
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: 32 },
  button: { marginTop: 12 },
});


// src/components/EmptyState.tsx
/*import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';

interface Props {
  onAdd: () => void;
}

export default function EmptyState({ onAdd }: Props) {
  return (
    <View style={styles.container}>
      <Title>No notes yet</Title>
      <Paragraph>Create your first note — it will appear here.</Paragraph>
      <Button mode="contained" onPress={onAdd} style={styles.button}>Add Note</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: 32 },
  button: { marginTop: 12 }
});
*/