// src/screens/AddNoteScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { loadNotes, saveNotes } from '../utils/storage';
import type { Note } from '../types/Note';
import { generateUUID } from '../utils/uuid';
import { useNavigation } from '@react-navigation/native';

export default function AddNoteScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [snack, setSnack] = useState({ visible: false, msg: '' });

  const validate = () => {
    if (!title.trim()) {
      setSnack({ visible: true, msg: 'Title is required' });
      return false;
    }
    if (title.length > 100) {
      setSnack({ visible: true, msg: 'Title too long (max 100)' });
      return false;
    }
    if (body.length > 5000) {
      setSnack({ visible: true, msg: 'Body too long (max 5000)' });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const existing = (await loadNotes()) || [];
      const now = new Date().toISOString();

      const newNote: Note = {
        id: generateUUID(),
        title: title.trim(),
        body,
        pinned: false,
        createdAt: now,
        updatedAt: now,
      };

      const next = [newNote, ...existing];
      await saveNotes(next);

      navigation.goBack();
    } catch (e) {
      setSnack({ visible: true, msg: 'Failed to save note' });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="flat"
          maxLength={100}
          style={styles.input}
          placeholder="Note title"
        />

        <TextInput
          label="Body"
          value={body}
          onChangeText={setBody}
          mode="flat"
          multiline
          numberOfLines={6}
          maxLength={5000}
          style={[styles.input, { height: 160 }]}
          placeholder="Write something..."
        />

        <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
          Save
        </Button>
      </View>

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, msg: '' })}
      >
        {snack.msg}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  form: { padding: 16, flex: 1 },
  input: { marginBottom: 12 },
  saveButton: { marginTop: 12 },
});


// src/screens/AddNoteScreen.tsx
/*import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar, TextInput, Button, Snackbar } from 'react-native-paper';
import { loadNotes, saveNotes } from '../utils/storage';
import type { Note } from '../types/Note';
import { v4 as uuidv4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';

export default function AddNoteScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [snack, setSnack] = useState<{ visible: boolean; msg: string }>({ visible: false, msg: '' });

  const validate = (): boolean => {
    if (!title.trim()) {
      setSnack({ visible: true, msg: 'Title is required' });
      return false;
    }
    if (title.length > 100) {
      setSnack({ visible: true, msg: 'Title too long' });
      return false;
    }
    if (body.length > 5000) {
      setSnack({ visible: true, msg: 'Body too long' });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      const existing = (await loadNotes()) || [];
      const now = new Date().toISOString();
      const note: Note = {
        id: uuidv4(),
        title: title.trim(),
        body,
        pinned: false,
        createdAt: now,
        updatedAt: now
      };
      const next = [note, ...existing];
      await saveNotes(next);
      navigation.goBack();
    } catch (e) {
      setSnack({ visible: true, msg: 'Failed to save note' });
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Note" />
      </Appbar.Header>

      <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <View style={styles.form}>
          <TextInput label="Title" value={title} mode="flat" onChangeText={setTitle} maxLength={100} style={styles.input} placeholder="Note title" />
          <TextInput label="Body" value={body} onChangeText={setBody} mode="flat" multiline numberOfLines={6} maxLength={5000} style={[styles.input, { height: 160 }]} placeholder="Write something..." />
          <Button mode="contained" onPress={handleSave} style={styles.saveButton}>Save</Button>
        </View>

        <Snackbar visible={snack.visible} onDismiss={() => setSnack({ visible: false, msg: '' })}>{snack.msg}</Snackbar>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  form: { padding: 16, flex: 1 },
  input: { marginBottom: 12 },
  saveButton: { marginTop: 8 }
});
*/