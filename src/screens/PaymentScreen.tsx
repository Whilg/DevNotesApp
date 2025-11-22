import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

export default function PaymentScreen({ route, navigation }: Props) {
    const { theme, buyAndApplyTheme } = useTheme();
    const { themeToBuy } = route.params;

    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [cpf, setCpf] = useState('');
    const [processing, setProcessing] = useState(false);

    const handlePayment = () => {
        if (!name || !cardNumber || !expiry || !cvv || !cpf) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos do cartão.');
            return;
        }

        setProcessing(true);

        setTimeout(() => {
            setProcessing(false);
            buyAndApplyTheme(themeToBuy.key);

            Alert.alert(
                'Pagamento Aprovado! 🎉',
                'O Tema ${themeToBuy.name} foi ativado.',
                [{ text: 'OK', onPress: () => navigation.popToTop() }]
            );
        }, 2000);
    };

    const inputStyle = [
        styles.input,
        { backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.secondary }
    ];

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Checkout</Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondary }]}>
                Comprando: <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>{themeToBuy.name}</Text>
            </Text>
            <Text style={[styles.price, { color: theme.colors.text }]}>{themeToBuy.price}</Text>

            <Text style={[styles.label, { color: theme.colors.text }]}>Nome no Cartão</Text>
            <TextInput style={inputStyle} placeholder="Ex: Wilson Lucena" placeholderTextColor="#666" value={name} onChangeText={setName}/>

            <Text style={[styles.label, { color: theme.colors.text }]}>Número do Cartão</Text>
            <TextInput style={inputStyle} placeholder="0000 0000 0000 0000" placeholderTextColor="#666" value={cardNumber} onChangeText={setCardNumber} maxLength={16}/>

            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Validade</Text>
                    <TextInput style={inputStyle} placeholder="MM/AA" placeholderTextColor="#666" value={expiry} onChangeText={setExpiry} maxLength={5}/>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>CVV</Text>
                    <TextInput style={inputStyle} placeholder="123" placeholderTextColor="#666" keyboardType="numeric" value={cvv} onChangeText={setCvv} maxLength={3}/>
                </View>
            </View>

            <Text style={[styles.label, { color: theme.colors.text }]}>CPF</Text>
            <TextInput style={inputStyle} placeholder="000.000.000-00" placeholderTextColor="#666" keyboardType="numeric" value={cpf} onChangeText={setCpf} maxLength={11}/>

            <TouchableOpacity
                style={[styles.payButton, { backgroundColor: theme.colors.primary }]}
                onPress={handlePayment}
                disabled={processing}
            >
                {processing ? (
                    <ActivityIndicator color={theme.colors.background}/>
                ) : (
                    <Text style={[styles.payButtonText, { color: theme.colors.background }]}>Pagar Agora</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    subtitle: {
        fontSize: 18,
        marginBottom: 5,
    },

    price: {
        fontSize:24,
        fontWeight: 'bold',
        marginBottom: 30,
    },

    label: {
        marginBottom: 8,
        fontSize: 16,
    },

    input: {
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        marginBottom: 20,
        fontSize: 16,
    },

    row: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },

    payButton: {
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },

    payButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});