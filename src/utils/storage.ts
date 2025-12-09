// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Note } from '../types/Note';

const NOTES_KEY = '@rnnotes_notes_v1';
const THEME_OVERRIDE_KEY = '@rnnotes_theme_override_v1';
const SEEDED_KEY = '@rnnotes_seeded_v2'; // change version


export async function saveNotes(notes: Note[]): Promise<void> {
  try {
    const cleaned = notes.map(n => ({
      ...n,
      id: String(n.id), // always string
    }));

    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(cleaned));
  } catch (e) {
    console.log('❌ saveNotes error:', e);
    throw e; // allow screen to show "Failed to save note"
  }
}

export async function loadNotes(): Promise<Note[] | null> {
  try {
    const raw = await AsyncStorage.getItem(NOTES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.log('❌ loadNotes error:', e);
    return [];
  }
}

export async function clearNotes(): Promise<void> {
  await AsyncStorage.removeItem(NOTES_KEY);
}

export async function getThemeOverride(): Promise<'light' | 'dark' | null> {
  const v = await AsyncStorage.getItem(THEME_OVERRIDE_KEY);
  if (!v || v === 'null') return null;
  return v as 'light' | 'dark';
}

export async function setThemeOverride(value: 'light' | 'dark' | null): Promise<void> {
  await AsyncStorage.setItem(THEME_OVERRIDE_KEY, value === null ? 'null' : value);
}

export async function hasSeeded(): Promise<boolean> {
  const v = await AsyncStorage.getItem(SEEDED_KEY);
  return v === '1';
}

export async function markSeeded(): Promise<void> {
  await AsyncStorage.setItem(SEEDED_KEY, '1');
}



// src/utils/storage.ts
/*-import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types/Note';

const NOTES_KEY = '@rnnotes_notes_v1';
const THEME_OVERRIDE_KEY = '@rnnotes_theme_override_v1';
const SEEDED_KEY = '@rnnotes_seeded_v1';

export async function saveNotes(notes: Note[]): Promise<void> {
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export async function loadNotes(): Promise<Note[] | null> {
  const raw = await AsyncStorage.getItem(NOTES_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as Note[];
}

export async function clearNotes(): Promise<void> {
  await AsyncStorage.removeItem(NOTES_KEY);
}

export async function getThemeOverride(): Promise<'dark' | 'light' | null> {
  const v = await AsyncStorage.getItem(THEME_OVERRIDE_KEY);
  if (v === null) return null;
  if (v === 'null') return null;
  return (v as 'dark' | 'light' | null);
}

export async function setThemeOverride(value: 'dark' | 'light' | null): Promise<void> {
  await AsyncStorage.setItem(THEME_OVERRIDE_KEY, value === null ? 'null' : value);
}

export async function hasSeeded(): Promise<boolean> {
  const v = await AsyncStorage.getItem(SEEDED_KEY);
  return v === '1';
}

export async function markSeeded(): Promise<void> {
  await AsyncStorage.setItem(SEEDED_KEY, '1');
}
*/