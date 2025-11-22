import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { NotesProvider } from './src/context/NotesContext';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <AppNavigator />
      </NotesProvider>
    </ThemeProvider>
  )
}