import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, 'NoteDetail'>;

export default function NoteDetailScreen({ route }: Props) {

    const {note} = route.params;

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
})