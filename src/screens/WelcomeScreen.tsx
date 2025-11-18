import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({navigation}: Props) {
    return(
        <LinearGradient
            colors={['#1F1A36', '#121212']}
            style={styles.container}
        >
            <StatusBar barStyle="light-content"/>
            <Text style={styles.logo}>DevNotes</Text>
            <Text style={styles.subtitle}>Seu app de anotações para o dia a dia dev.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },

    logo: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#00D8FF',
        marginBottom: 20,
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
        alignSelf: 'center',
    },

    buttonText: {
        color: '#121212',
        fontSize: 18,
        fontWeight: 'bold',
    },
});