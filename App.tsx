import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { NotesProvider } from './src/context/NotesContext';

export default function App() {
  return (
    <NotesProvider>
      <AppNavigator />
    </NotesProvider>
  )
}