import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity, Image } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { RootStackParamList, Note } from "../types";
import * as ImagePicker from 'expo-image-picker';
import { useNotes } from '../context/NotesContext'
import { useRoute } from '@react-navigation/native';

const CATEGORY_OPTIONS: ('Bug' | 'Feature' | 'Ideia')[] = ['Ideia', 'Feature', 'Bug'];

const noteSchema = yup.object().shape({
    title: yup.string().required('O título é obrigatório.').min(5, 'O título deve ter no mínimo 5 caracteres.'),
    content: yup.string(),
});

type FormData = {
    title: string;
    content?: string;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddNote'>;

export default function AddNoteScreen({ navigation }: Props) {
    const { addNote, updateNote } = useNotes();

    const route = useRoute<Props['route']>();

    const noteToEdit = route.params?.noteToEdit;
    const isEditMode = !!noteToEdit;

    const [imageUri, setImageUri] = useState<string | null>(noteToEdit?.imageUri || null)

    const [selectedCategory, setSelectedCategory] = useState<string>(
        noteToEdit?.category || CATEGORY_OPTIONS[0]
      );

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(noteSchema),
        defaultValues: {
            title: noteToEdit?.title || '',
            content: noteToEdit?.content || '',
        },
    });

    useEffect(() => {
        navigation.setOptions({
            title: isEditMode ? 'Editar Anotação' : 'Nova Anotação'
        });
    }, [navigation, isEditMode]);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar sua galeria.')
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri)
        }
    };

    const onSubmit = async (data: FormData) => {
        if (isEditMode) {
            const updatedNote: Note = {
                ...noteToEdit,
                ...data,
                category: selectedCategory as 'Bug' | 'Feature' | 'Ideia',
                imageUri: imageUri || undefined,
            };
            await updateNote(updatedNote);
            Alert.alert('Sucesso!', 'Sua anotação foi atualizada')
            navigation.goBack();
        } else{
            await addNote({
                title: data.title,
                content: data.content || '',
                category: selectedCategory as 'Bug' | 'Feature' | 'Ideia',
                imageUri: imageUri || undefined,
            });
            Alert.alert('Sucesso!', 'Sua anotação foi criada');
            navigation.navigate('Home')
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Título</Text>
            <Controller
                control={control}
                name='title'
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Ex: Corrigir bug de autenticação"
                    placeholderTextColor="#888"
                    />
                )}
            />
            {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

            <Text style={styles.label}>Conteúdo</Text>
            <Controller
                control={control}
                name="content"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Descreva a anotação aqui..."
                        placeholderTextColor="#888"
                        multiline
                    />
                )}
            />
            
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                    mode="dropdown"
                    style={styles.picker}
                    dropdownIconColor="#00D8FF"
                    itemStyle={styles.pickerItem}
                >
                    {CATEGORY_OPTIONS.map((cat) => (
                        <Picker.Item key={cat} label={cat} value={cat} color="#121212"/>
                    ))}
                </Picker>
            </View>

            {errors.content && <Text style={styles.errorText}>{errors.content.message}</Text>}

            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Text style={styles.imageButtonText}>Anexar Imagem da Galeria 📷</Text>
            </TouchableOpacity>

            {imageUri && (
                <Image source={{uri: imageUri }} style={styles.previewImage} />
            )}

            <View style={styles.saveButton}>
                <Button 
                    title={isEditMode ? "Salvar Alterações" : "Salvar Anotação" }
                    onPress={handleSubmit(onSubmit)} 
                    color="#00D8FF"
                />
            </View>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },

    label: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
    },
    
    input: {
        backgroundColor: '#252525',
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#333',
    },

    pickerContainer: {
        backgroundColor: '#252525',
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
    },

    picker: {
        height: 50,
        color: '#fff',
        width: '100%',
    },

    pickerItem: {
        color: '#fff',
        backgroundColor: '#121212',
    },

    textArea: {
        height: 150,
        textAlignVertical: 'top',
    },
    errorText: {
        color: '#FF4500',
        marginBottom: 10,
        marginLeft: 5,
    },

    imageButton: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 15,
    },

    imageButtonText: {
        color: '#00D8FF',
        fontWeight: 'bold',
    },

    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 15,
        resizeMode: 'cover',
    },

    saveButton: {
        marginTop: 'auto',
    },
});