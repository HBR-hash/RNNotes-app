// src/components/NoteCard.tsx
import React from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { Card, IconButton, Paragraph, Title } from 'react-native-paper';
import type { Note } from '../types/Note';
import { formatDate } from '../utils/format';
import useAnimatedPress from '../hooks/useAnimatedPress';
import { Text } from 'react-native';

interface Props {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
  highlight?: string;
}

function highlightText(text: string, q?: string) {
  if (!q) return <>{text}</>;
  const parts = text.split(new RegExp(`(${q})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <Text key={i} style={styles.highlight}>
            {part}
          </Text>
        ) : (
          <Text key={i}>{part}</Text>
        ),
      )}
    </>
  );
}

export default function NoteCard({ note, onPress, onDelete, onTogglePin, highlight }: Props) {
  const { animatedStyle, pressHandlers } = useAnimatedPress(onPress);

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Pressable {...pressHandlers}>
        <Card style={styles.card}>
          <Card.Content>
            <Title numberOfLines={1}>{highlightText(note.title, highlight)}</Title>
            <Paragraph numberOfLines={2} style={styles.body}>
              {highlightText(note.body, highlight)}
            </Paragraph>
            <Paragraph style={styles.date}>{formatDate(note.updatedAt || note.createdAt)}</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <IconButton icon={note.pinned ? 'pin' : 'pin-outline'} size={20} onPress={onTogglePin} accessibilityLabel="Pin" />
            <IconButton icon="pencil" size={20} onPress={onPress} accessibilityLabel="Edit" />
            <IconButton icon="delete" size={20} onPress={onDelete} accessibilityLabel="Delete" />
          </Card.Actions>
        </Card>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  card: { borderRadius: 12, elevation: 3, overflow: 'hidden' },
  body: { marginTop: 6 },
  date: { marginTop: 8, fontSize: 12, opacity: 0.7 },
  actions: { justifyContent: 'flex-end' },
  highlight: { backgroundColor: '#FFF59D' }, // subtle yellow
});


// src/components/NoteCard.tsx
/*import React, { useRef } from 'react';
import { Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Card, IconButton, Paragraph, Title } from 'react-native-paper';
import type { Note } from '../types/Note';
import { formatDate } from '../utils/format';

interface Props {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
}

export default function NoteCard({ note, onPress, onDelete, onTogglePin }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true, friction: 6 }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 6 }).start();
  };

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
      <TouchableWithoutFeedback onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Card style={styles.card}>
          <Card.Content>
            <Title numberOfLines={1}>{note.title}</Title>
            <Paragraph numberOfLines={2} style={styles.body}>{note.body}</Paragraph>
            <Paragraph style={styles.date}>{formatDate(note.updatedAt || note.createdAt)}</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <IconButton icon={note.pinned ? 'pin' : 'pin-outline'} size={20} onPress={onTogglePin} accessibilityLabel="Pin" />
            <IconButton icon="pencil" size={20} onPress={onPress} accessibilityLabel="Edit" />
            <IconButton icon="delete" size={20} onPress={onDelete} accessibilityLabel="Delete" />
          </Card.Actions>
        </Card>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  card: {
    borderRadius: 12,
    elevation: 3,
    overflow: 'hidden'
  },
  body: { marginTop: 6 },
  date: { marginTop: 8, fontSize: 12, opacity: 0.7 },
  actions: { justifyContent: 'flex-end' }
});
*/