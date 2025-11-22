import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import AddNoteScreen from '../screens/AddNoteScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';
import StoreScreen from '../screens/StoreScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { theme } = useTheme();

    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{
                    headerStyle: {backgroundColor: theme.colors.card},
                    headerTintColor: theme.colors.text,
                    headerTitleStyle: {fontWeight: 'bold'},
                }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Suas Anotações'}}/>
                <Stack.Screen name="AddNote" component={AddNoteScreen} options={{title: 'Nova Anotação'}}/>
                <Stack.Screen name="NoteDetail" component={NoteDetailScreen} options={{title: 'Detalhes da Anotação'}}/>
                <Stack.Screen
                    name="Store"
                    component={StoreScreen}
                    options={{ title: 'Loja de Temas' }}
                />
                <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Pagamento Seguro' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}