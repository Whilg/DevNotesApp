import React from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";

const noteSchema = yup.object().shape({
    title: yup.string().required('O título é obrigatório.').min(5, 'O título deve ter no mínimo 5 caracteres.'),
    content: yup.string().required('O conteúdo é obrigatório.').min(10, 'O conteúdo deve ter no mínimo 10 caracteres.'),
});

type FormData = {
    title: string;
    content: string;
};

type Props = NativeStackScreenProps<RootStackParamList, 'AddNote'>;

export default function AddNoteScreen({ navigation }: Props) {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(noteSchema),
        defaultValues: {title: '', content: ''},
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        Alert.alert('Sucesso!', 'Sua anotação foi criada');
        navigation.goBack();
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

            <Button title="Salvar Anotação" onPress={handleSubmit(onSubmit)} color="#00D8FF" />
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

    textArea: {
        height: 150,
        textAlignVertical: 'top',
    },
    errorText: {
        color: '#FF4500',
        marginBottom: 10,
        marginLeft: 5,
    },
});