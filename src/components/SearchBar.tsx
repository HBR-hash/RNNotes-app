// src/components/SearchBar.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Props {
  value: string;
  onChange: (t: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <View style={styles.container}>
      <Searchbar placeholder={placeholder || 'Search'} value={value} onChangeText={onChange} style={styles.bar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, paddingTop: 8 },
  bar: { borderRadius: 12 },
});


// src/components/SearchBar.tsx
/*import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface Props {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <View style={styles.container}>
      <Searchbar placeholder={placeholder || 'Search'} value={value} onChangeText={onChange} style={styles.bar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, paddingTop: 8 },
  bar: { borderRadius: 12 }
});
*/