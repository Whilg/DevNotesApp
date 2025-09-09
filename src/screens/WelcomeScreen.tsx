import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({navigation}: Props) {
    return(
        <View>
            <StatusBar barStyle="light-content"/>
            <Text style={styles.logo}>DevNotes</Text>
            <Text style={styles.subtitle}>Seu app de anotações para o dia a dia dev.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    logo: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#00D8FF',
        marginBottom: 20,
        marginTop: 80,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 18,
        color: '#B3B3B3',
        textAlign: 'center',
        marginBottom: 50,
    },

    button: {
        backgroundColor: '#00D8FF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
    },

    buttonText: {
        color: '#121212',
        fontSize: 18,
        fontWeight: 'bold',
    },
});