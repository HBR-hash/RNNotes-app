// src/screens/SettingsScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Button, Snackbar } from 'react-native-paper';
import { useThemeContext } from '../context/ThemeContext';
import { clearNotes } from '../utils/storage';

export default function SettingsScreen() {
  const { override, setManualOverride, isDark } = useThemeContext() as any;
  const [snack, setSnack] = useState({ visible: false, msg: '' });

  const toggleAuto = async () => {
    if (override === null) {
      await setManualOverride(isDark ? 'light' : 'dark');
    } else {
      await setManualOverride(null);
    }
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Item
          title="Theme (auto / manual)"
          description={override === null ? 'Using system theme' : `Manual: ${override}`}
          right={() => <Switch value={override !== null} onValueChange={toggleAuto} />}
        />

        <List.Item title="Force Light" right={() => <Button onPress={() => setManualOverride('light')}>Light</Button>} />
        <List.Item title="Force Dark" right={() => <Button onPress={() => setManualOverride('dark')}>Dark</Button>} />

        <List.Item
          title="Clear Notes"
          description="Remove all notes from local storage"
          right={() => (
            <Button onPress={async () => {
              await clearNotes();
              setSnack({ visible: true, msg: 'Notes cleared' });
            }}>
              Clear
            </Button>
          )}
        />
      </List.Section>

      <Snackbar visible={snack.visible} onDismiss={() => setSnack({ visible: false, msg: '' })}>
        {snack.msg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 12 },
});


// src/screens/SettingsScreen.tsx
/*import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, List, Switch, Button, Snackbar } from 'react-native-paper';
import { useThemeContext } from '../context/ThemeContext';
import { clearNotes } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { override, setManualOverride, isDark } = useThemeContext() as any;
  const [snack, setSnack] = useState<{ visible: boolean; msg: string }>({ visible: false, msg: '' });

  const toggleAuto = async () => {
    try {
      if (override === null) {
        await setManualOverride(isDark ? 'light' : 'dark');
      } else {
        await setManualOverride(null);
      }
    } catch (e) {
      setSnack({ visible: true, msg: 'Failed to update theme' });
    }
  };

  const setLight = async () => {
    await setManualOverride('light');
  };

  const setDark = async () => {
    await setManualOverride('dark');
  };

  const handleClear = async () => {
    try {
      await clearNotes();
      setSnack({ visible: true, msg: 'Notes cleared' });
    } catch (e) {
      setSnack({ visible: true, msg: 'Failed to clear notes' });
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <View style={styles.container}>
        <List.Section>
          <List.Item
            title="Theme (auto / manual)"
            description={override === null ? 'Using system theme' : `Manual: ${override}`}
            right={() => <Switch value={override !== null} onValueChange={toggleAuto} />}
          />
          <List.Item title="Force Light" right={() => <Button compact onPress={setLight}>Light</Button>} />
          <List.Item title="Force Dark" right={() => <Button compact onPress={setDark}>Dark</Button>} />
          <List.Item title="Clear Notes" description="Remove all notes from local storage" right={() => <Button compact onPress={handleClear}>Clear</Button>} />
        </List.Section>
      </View>

      <Snackbar visible={snack.visible} onDismiss={() => setSnack({ visible: false, msg: '' })}>{snack.msg}</Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 8 },
});
*/

// src/screens/SettingsScreen.tsx
/*import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, List, Switch, Button, Snackbar } from 'react-native-paper';
import { useThemeContext } from '../context/ThemeContext';
import { clearNotes } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { override, setManualOverride, isDark } = useThemeContext();
  const [snack, setSnack] = useState<{ visible: boolean; msg: string }>({ visible: false, msg: '' });

  const toggleAuto = async () => {
    try {
      if (override === null) {
        await setManualOverride(isDark ? 'light' : 'dark');
      } else {
        await setManualOverride(null);
      }
    } catch (e) {
      setSnack({ visible: true, msg: 'Failed to update theme' });
    }
  };

  const setLight = async () => {
    await setManualOverride('light');
  };

  const setDark = async () => {
    await setManualOverride('dark');
  };

  const handleClear = async () => {
    try {
      await clearNotes();
      setSnack({ visible: true, msg: 'Notes cleared' });
    } catch (e) {
      setSnack({ visible: true, msg: 'Failed to clear notes' });
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <View style={styles.container}>
        <List.Section>
          <List.Item
            title="Theme (auto / manual)"
            description={override === null ? 'Using system theme' : `Manual: ${override}`}
            right={() => <Switch value={override !== null} onValueChange={toggleAuto} />}
          />
          <List.Item title="Force Light" right={() => <Button compact onPress={setLight}>Light</Button>} />
          <List.Item title="Force Dark" right={() => <Button compact onPress={setDark}>Dark</Button>} />
          <List.Item title="Clear Notes" description="Remove all notes from local storage" right={() => <Button compact onPress={handleClear}>Clear</Button>} />
        </List.Section>
      </View>

      <Snackbar visible={snack.visible} onDismiss={() => setSnack({ visible: false, msg: '' })}>{snack.msg}</Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 8 }
});
*/