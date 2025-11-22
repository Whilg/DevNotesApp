import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Note } from '../types';
import { useNotes } from '../context/NotesContext';
import { useTheme } from '../context/ThemeContext';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
    const { notes, loading } = useNotes();
    const { theme } = useTheme();

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Store')} style={{ marginRight: 10 }}>
              <Text style={{ fontSize: 24 }}>🎨</Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation]);

    const renderNote = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={[styles.noteCard, { backgroundColor: theme.colors.card }]}
            onPress={() => navigation.navigate('NoteDetail', { noteId: item.id })}>
            <Text style={[styles.noteTitle, { color: theme.colors.text }]}>{item.title}</Text>
            <View style={styles.footer}>
                <Text style={[styles.noteCategory, { color: theme.colors.primary }]}>{item.category}</Text>
                {item.imageUri && <Text style={styles.icon}>📷</Text>}
            </View>
        </TouchableOpacity>
    );

    if (loading && notes.length === 0) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00D8FF" />
          </View>
        );
      }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <FlatList
                data={notes}
                renderItem={renderNote}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma anotação ainda.</Text>}
            />
            <TouchableOpacity 
            style={[styles.fab, { backgroundColor: theme.colors.primary }]} 
            onPress={() => navigation.navigate('AddNote')}
            >
                <Text style={[styles.fabText, { color: theme.colors.background }]}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },

    noteCard: {
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },

    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    noteCategory: {
        fontSize: 14,
        marginTop: 5,
    },

    icon: {
        fontSize: 16,
    },

    emptyText: {
        textAlign: 'center',
        marginTop: 50,
    },

    fab: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    
    fabText: {
        fontSize: 30,
    },

    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})