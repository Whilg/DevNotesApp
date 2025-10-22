import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Note } from '../types';
import { useNotes } from '../context/NotesContext';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
    const { notes } = useNotes();

    const renderNote = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={styles.noteCard}
            onPress={() => navigation.navigate('NoteDetail', {note: item})}
        >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <View style={styles.footer}>
                <Text style={styles.noteCategory}>{item.category}</Text>
                {item.imageUri && <Text style={styles.icon}>📷</Text>}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                renderItem={renderNote}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma anotação ainda.</Text>}
            />
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddNote')}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 10
    },

    noteCard: {
        backgroundColor: '#252525',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },

    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    noteCategory: {
        fontSize: 14,
        color: '#00D8FF',
        marginTop: 5,
    },

    icon: {
        fontSize: 16,
        color: '#fff'
    },

    emptyText: {
        color: '#B3B3B3',
        textAlign: 'center',
        marginTop: 50,
    },

    fab: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        backgroundColor: '#00D8FF',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    
    fabText: {
        fontSize: 30,
        color: '#121212',
    },
})