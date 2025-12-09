// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, IconButton } from 'react-native-paper';
import { View } from 'react-native';

import { useThemeContext } from '../context/ThemeContext';

import NotesScreen from '../screens/NotesScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import EditNoteScreen from '../screens/EditNoteScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootStackParamList = {
  Notes: { openSortMenu?: boolean } | undefined;
  AddNote: undefined;
  EditNote: { noteId: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { paperTheme, navTheme } = useThemeContext();

  return (
    <PaperProvider theme={paperTheme as any}>
      <NavigationContainer theme={navTheme as any}>
        <Stack.Navigator initialRouteName="Notes">

          {/* NOTES SCREEN */}
          <Stack.Screen
            name="Notes"
            component={NotesScreen}
            options={({ navigation }) => ({
              title: 'RNNotes',
              headerShadowVisible: false,
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <IconButton
                    icon="sort"
                    size={22}
                    onPress={() =>
                      navigation.navigate('Notes', { openSortMenu: true } as any)
                    }
                  />
                  <IconButton
                    icon="cog"
                    size={22}
                    onPress={() => navigation.navigate('Settings')}
                  />
                </View>
              ),
            })}
          />

          <Stack.Screen
            name="AddNote"
            component={AddNoteScreen}
            options={{ title: 'Add Note' }}
          />

          <Stack.Screen
            name="EditNote"
            component={EditNoteScreen}
            options={{ title: 'Edit Note' }}
          />

          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}


// src/navigation/AppNavigator.tsx
/*import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

import { useThemeContext } from '../context/ThemeContext';

import NotesScreen from '../screens/NotesScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import EditNoteScreen from '../screens/EditNoteScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootStackParamList = {
  Notes: undefined;
  AddNote: undefined;
  EditNote: { noteId: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { paperTheme, navTheme } = useThemeContext();

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator initialRouteName="Notes">
          <Stack.Screen
            name="Notes"
            component={NotesScreen}
            options={{ title: 'Notes' }}
          />
          <Stack.Screen
            name="AddNote"
            component={AddNoteScreen}
            options={{ title: 'Add Note' }}
          />
          <Stack.Screen
            name="EditNote"
            component={EditNoteScreen}
            options={{ title: 'Edit Note' }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
*/