// src/screens/EditNoteScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { loadNotes, saveNotes } from '../utils/storage';
import type { Note } from '../types/Note';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

type EditRouteProp = RouteProp<RootStackParamList, 'EditNote'>;

export default function EditNoteScreen() {
  const navigation = useNavigation();
  const route = useRoute<EditRouteProp>();

  const { noteId } = route.params;

  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [snack, setSnack] = useState({ visible: false, msg: '' });

  // Load Note
  useEffect(() => {
    let active = true;

    (async () => {
      const all = (await loadNotes()) || [];
      const found = all.find((n) => n.id === noteId);

      if (active && found) {
        setNote(found);
        setTitle(found.title);
        setBody(found.body);
      }
    })();

    return () => {
      active = false;
    };
  }, [noteId]);

  const validate = () => {
    if (!title.trim()) {
      setSnack({ visible: true, msg: 'Title is required' });
      return false;
    }
    if (title.length > 100) {
      setSnack({ visible: true, msg: 'Title too long (max 100 chars)' });
      return false;
    }
    if (body.length > 5000) {
      setSnack({ visible: true, msg: 'Body too long (max 5000 chars)' });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const all = (await loadNotes()) || [];
      const updated = all.map((n) =>
        n.id === noteId
          ? { ...n, title: title.trim(), body, updatedAt: new Date().toISOString() }
          : n
      );

      await saveNotes(updated);
      navigation.goBack();
    } catch (e) {
      setSnack({ visible: true, msg: 'Failed to save note' });
    }
  };

  if (!note) return null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <TextInput
          label="Title"
          value={title}
          mode="flat"
          onChangeText={setTitle}
          maxLength={100}
          style={styles.input}
        />

        <TextInput
          label="Body"
          value={body}
          onChangeText={setBody}
          mode="flat"
          multiline
          numberOfLines={8}
          maxLength={5000}
          style={[styles.input, { height: 180 }]}
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
  form: { flex: 1, padding: 16 },
  input: { marginBottom: 12 },
  saveButton: { marginTop: 10, paddingVertical: 6 },
});


// src/screens/EditNoteScreen.tsx
/*import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar, TextInput, Button, Snackbar } from 'react-native-paper';
import { loadNotes, saveNotes } from '../utils/storage';
import type { Note } from '../types/Note';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

type EditRouteProp = RouteProp<RootStackParamList, 'EditNote'>;

export default function EditNoteScreen() {
  const route = useRoute<EditRouteProp>();
  const navigation = useNavigation();
  const { noteId } = route.params;
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [snack, setSnack] = useState<{ visible: boolean; msg: string }>({ visible: false, msg: '' });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const all = (await loadNotes()) || [];
        const found = all.find((n) => n.id === noteId);
        if (mounted && found) {
          setNote(found);
          setTitle(found.title);
          setBody(found.body);
        }
      } catch (e) {
        setSnack({ visible: true, msg: 'Failed to load note' });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [noteId]);

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
      const all = (await loadNotes()) || [];
      const next = all.map((n) => (n.id === noteId ? { ...n, title: title.trim(), body, updatedAt: new Date().toISOString() } : n));
      await saveNotes(next);
      navigation.goBack();
    } catch (e) {
      setSnack({ visible: true, msg: 'Failed to save' });
    }
  };

  if (!note) return null;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Note" />
      </Appbar.Header>

      <KeyboardAvoidingView style={styles.container} behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <View style={styles.form}>
          <TextInput label="Title" value={title} mode="flat" onChangeText={setTitle} maxLength={100} style={styles.input} />
          <TextInput label="Body" value={body} onChangeText={setBody} mode="flat" multiline numberOfLines={6} maxLength={5000} style={[styles.input, { height: 160 }]} />
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