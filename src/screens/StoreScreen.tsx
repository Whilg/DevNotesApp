import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { THEMES, ThemeType } from '../constants/themes';
import { useNavigation } from '@react-navigation/native';

export default function StoreScreen() {
    const { theme, currentThemeKey, buyAndApplyTheme } = useTheme();

    const themesList = Object.values(THEMES);

    const navigation = useNavigation<any>();

    const handleBuy = (selectedTheme: ThemeType) => {
        navigation.navigate('Payment', { themeToBuy: selectedTheme });
    };

    const renderThemeItem = ({ item }: { item: ThemeType }) => {
        const isActive = item.key === currentThemeKey;

        return (
            <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.secondary }]}>
              <View style={styles.cardInfo}>
                <Text style={[styles.themeName, { color: theme.colors.text }]}>{item.name}</Text>
                <Text style={[styles.themePrice, { color: theme.colors.secondary }]}>{item.price}</Text>
              </View>

              {isActive ? (
                <View style={[styles.activeBadge, { backgroundColor: theme.colors.secondary }]}>
                    <Text style={[styles.activeText, { color: theme.colors.background }]}>Ativo</Text>
                </View>
              ) : (
                <TouchableOpacity
                    style={[styles.buyButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => handleBuy(item)}
                >
                    <Text style={[styles.buyButtonText, { color: theme.colors.background }]}>Comprar</Text>
                </TouchableOpacity>
              )}  
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Loja de Temas 🎨</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.secondary }]}>
                Personalize seu DevNotes com estilos exclusivos.
            </Text>

            <FlatList
                data={themesList}
                renderItem={renderThemeItem}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    headerSubtitle: {
        fontSize: 16,
        marginBottom: 30,
    },

    listContent: {
        paddingBottom: 20,
    },

    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
    },

    cardInfo: {
        flex: 1,
    },

    themeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    themePrice: {
        fontSize: 14,
    },

    buyButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    
    buyButtonText: {
        fontWeight: 'bold',
    },

    activeBadge: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },

    activeText: {
        fontWeight: 'bold',
        fontSize: 12,
    },
});