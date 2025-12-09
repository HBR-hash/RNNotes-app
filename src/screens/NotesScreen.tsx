// src/screens/NotesScreen.tsx
import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  View,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
  RefreshControl,
  Animated,
} from 'react-native';
import { FAB, Snackbar, IconButton, Menu, Divider } from 'react-native-paper';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { loadNotes, saveNotes, hasSeeded, markSeeded } from '../utils/storage';
import useDebouncedValue from '../hooks/useDebouncedValue';
import type { Note } from '../types/Note';
import { useThemeContext } from '../context/ThemeContext';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SAMPLE_NOTES: Note[] = [
  {
    id: 'seed-1',
    title: 'Welcome to RNNotes',
    body: 'This is a sample note. Tap + to create a new note. You can pin, search, edit, and delete notes.',
    pinned: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    title: 'Material design cards',
    body: 'Notes are presented on rounded cards with subtle shadows and animations.',
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'seed-3',
    title: 'Search is live',
    body: 'Type in the search bar and results update as you type (debounced).',
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

type SortType = 'pinned' | 'newest' | 'oldest' | 'az' | 'za';

export default function NotesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  const openSortMenu = (route.params as any)?.openSortMenu;

  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 250);

  const [menuVisible, setMenuVisible] = useState(false);
  const [sortType, setSortType] = useState<SortType>('pinned');

  const [snack, setSnack] = useState({ visible: false, msg: '', action: null as string | null });
  const [deletedNote, setDeletedNote] = useState<Note | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const isFirstLoad = useRef(true);
  const { fadeAnim } = useThemeContext();

  useEffect(() => {
    if (openSortMenu) {
      setMenuVisible(true);
      navigation.setParams({ openSortMenu: false });
    }
  }, [openSortMenu]);

  useEffect(() => {
    let active = true;

    async function load() {
      const seeded = await hasSeeded();
      if (!seeded) {
        await saveNotes(SAMPLE_NOTES);
        await markSeeded();
        if (active) setNotes(SAMPLE_NOTES);
        return;
      }

      const data = await loadNotes();
      if (active) setNotes(data || []);
    }

    load();

    return () => {
      active = false;
    };
  }, [isFocused]);

  useEffect(() => {
    if (!isFirstLoad.current) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    isFirstLoad.current = false;
  }, [notes.length]);

  const saveAndSet = async (list: Note[]) => {
    setNotes(list);
    await saveNotes(list);
  };

  const handleDelete = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    const next = notes.filter((n) => n.id !== id);
    setDeletedNote(note);
    saveAndSet(next);

    setSnack({ visible: true, msg: 'Note deleted', action: 'UNDO' });
  };

  const undoDelete = () => {
    if (!deletedNote) return;
    saveAndSet([deletedNote, ...notes]);
    setDeletedNote(null);
  };

  const togglePin = (id: string) => {
    const next = notes.map((n) =>
      n.id === id ? { ...n, pinned: !n.pinned, updatedAt: new Date().toISOString() } : n
    );
    saveAndSet(next);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const data = await loadNotes();
    setNotes(data || []);
    setRefreshing(false);
  };

  const filtered = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    let list = notes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q)
    );

    if (sortType === 'pinned') {
      list.sort((a, b) =>
        a.pinned === b.pinned
          ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          : a.pinned
          ? -1
          : 1
      );
    } else if (sortType === 'newest') {
      list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } else if (sortType === 'oldest') {
      list.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    } else if (sortType === 'az') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === 'za') {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }, [notes, debouncedQuery, sortType]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* SORT MENU for Navigation Header */}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={{ x: 330, y: 70 }}
      >
        <Menu.Item title="Pinned first" onPress={() => { setSortType('pinned'); setMenuVisible(false); }} />
        <Divider />
        <Menu.Item title="Newest" onPress={() => { setSortType('newest'); setMenuVisible(false); }} />
        <Menu.Item title="Oldest" onPress={() => { setSortType('oldest'); setMenuVisible(false); }} />
        <Divider />
        <Menu.Item title="A → Z" onPress={() => { setSortType('az'); setMenuVisible(false); }} />
        <Menu.Item title="Z → A" onPress={() => { setSortType('za'); setMenuVisible(false); }} />
      </Menu>

      <SearchBar value={query} onChange={setQuery} placeholder="Search notes (title & body)" />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={
          <EmptyState onAdd={() => navigation.navigate('AddNote' as never)} />
        }
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() =>
              navigation.navigate('EditNote' as never, { noteId: item.id } as never)
            }
            onDelete={() => handleDelete(item.id)}
            onTogglePin={() => togglePin(item.id)}
            highlight={debouncedQuery}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddNote' as never)}
      />

      <Snackbar
			visible={snack.visible}
			onDismiss={() => setSnack({ visible: false, msg: '', action: null })}
			action={{
				label: snack.action === 'UNDO' ? 'Undo' : '',
				onPress: undoDelete,
				textColor: '#ffeb3b', // bright yellow like Gmail
			}}

			duration={4000}
			style={{
				marginBottom: 16,
				borderRadius: 12,
			}}
			>
			{snack.msg}
	</Snackbar>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: { position: 'absolute', right: 16, bottom: 16 },
});


// src/screens/NotesScreen.tsx
/*import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList, LayoutAnimation, Platform, UIManager, StyleSheet } from 'react-native';
import { FAB, Appbar, Snackbar, IconButton } from 'react-native-paper';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { loadNotes, saveNotes, hasSeeded, markSeeded } from '../utils/storage';
import useDebouncedValue from '../hooks/useDebouncedValue';
import type { Note } from '../types/Note';
import { v4 as uuidv4 } from 'uuid';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SAMPLE_NOTES: Note[] = [
  {
    id: 'seed-1',
    title: 'Welcome to RNNotes',
    body: 'This is a sample note. Tap + to create a new note. You can pin, search, edit, and delete notes.',
    pinned: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'seed-2',
    title: 'Material design cards',
    body: 'Notes are presented on rounded cards with subtle shadows and animations.',
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'seed-3',
    title: 'Search is live',
    body: 'Type in the search bar and results update as you type (debounced).',
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function NotesScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebouncedValue(query, 250);
  const [snack, setSnack] = useState<{ visible: boolean; msg: string }>({ visible: false, msg: '' });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const seeded = await hasSeeded();
        if (!seeded) {
          await saveNotes(SAMPLE_NOTES);
          await markSeeded();
          if (mounted) setNotes(SAMPLE_NOTES);
          return;
        }
        const data = await loadNotes();
        if (mounted) setNotes(data || []);
      } catch (e) {
        setSnack({ visible: true, msg: 'Failed to load notes' });
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [isFocused]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [notes.length]);

  const saveAndSet = async (nextNotes: Note[]) => {
    try {
      setNotes(nextNotes);
      await saveNotes(nextNotes);
    } catch (e) {
      setSnack({ visible: true, msg: 'Save failed' });
    }
  };

  const handleDelete = (id: string) => {
    const next = notes.filter((n) => n.id !== id);
    saveAndSet(next);
    setSnack({ visible: true, msg: 'Note deleted' });
  };

  const togglePin = (id: string) => {
    const next = notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned, updatedAt: new Date().toISOString() } : n));
    saveAndSet(next);
    setSnack({ visible: true, msg: 'Toggled pin' });
  };

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    let list = notes || [];
    if (q.length > 0) {
      list = list.filter((n) => {
        const t = (n.title || '').toLowerCase();
        const b = (n.body || '').toLowerCase();
        return t.includes(q) || b.includes(q);
      });
    }
    list.sort((a, b) => {
      if (a.pinned === b.pinned) return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      return a.pinned ? -1 : 1;
    });
    return list;
  }, [notes, debouncedQuery]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="RNNotes" />
        <IconButton icon="cog" onPress={() => navigation.navigate('Settings' as never)} />
      </Appbar.Header>

      <SearchBar value={query} onChange={setQuery} placeholder="Search notes (title & body)" />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        ListEmptyComponent={<EmptyState onAdd={() => navigation.navigate('AddNote' as never)} />}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => navigation.navigate('EditNote' as never, { noteId: item.id } as never)}
            onDelete={() => handleDelete(item.id)}
            onTogglePin={() => togglePin(item.id)}
          />
        )}
      />

      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('AddNote' as never)} />

      <Snackbar visible={snack.visible} onDismiss={() => setSnack({ visible: false, msg: '' })} duration={2500}>
        {snack.msg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16
  }
});
*/