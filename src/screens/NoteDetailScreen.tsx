import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Button, Alert } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";
import { useNotes } from '../context/NotesContext'

type Props = NativeStackScreenProps<RootStackParamList, 'NoteDetail'>;

export default function NoteDetailScreen({ route, navigation }: Props) {

    const { noteId } = route.params;

    const { notes, deleteNote } = useNotes();

    const note = notes.find((n) => n.id === noteId);

    if (!note) {
        navigation.goBack();
        return null;
    }

    const handleDelete = () => {
        Alert.alert(
            "Excluir Anotação",
            "Tem certeza que deseja excluir esta anotação? Esta opção não pode ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        await deleteNote(note.id);
                        navigation.goBack();
                    },
                },
            ]
        );
    };

    const handleEdit = () => {
        navigation.navigate('AddNote', { noteToEdit: note });
    };

    return (
        <ScrollView style={styles.container}>
            {note.imageUri && (
                <Image source={{ uri: note.imageUri }} style={styles.image} />
            )}

            <View style={styles.header}>
                <Text style={styles.title}>{note.title}</Text>
                <View style={styles.badge}>
                    <Text style={styles.category}>{note.category}</Text>
                </View>
            </View>

            <Text style={styles.content}>{note.content}</Text>

            <View style={styles.buttonContainer}>
                <Button title="Editar Anotação" onPress={handleEdit} color="#00D8FF" />
                <View style={{ marginVertical: 10 }} />
                <Button title="Excluir Anotação" onPress={handleDelete} color="#FF4500" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },

    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },

    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingBottom: 15,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },

    badge: {
        backgroundColor: '#00D8FF',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },

    category: {
        color: '#121212',
        fontWeight: 'bold',
    },

    content: {
        padding: 20,
        fontSize: 18,
        color: '#B3B3B3',
        lineHeight: 28,
    },

    buttonContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#333',
        marginTop: 20,
    }
})