import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Note } from '../types';
import { MOCK_NOTES } from '../data/mockData';

type NotesContextType = {
    notes: Note[];
    addNote: (newNoteData: Omit<Note, 'id'>) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);

    const addNote = (newNoteData: Omit<Note, 'id'>) => {
        const newId = (Math.random() * 10000).toString();
        const newNote: Note = {
            id: newId,
            ...newNoteData,
        };
        setNotes((prevNotes) => [newNote, ...prevNotes]);
    };

    return (
        <NotesContext.Provider value={{ notes, addNote }}>
            {children}
        </NotesContext.Provider>
    );
};

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('useNotes deve ser usado dentro de um NotesProvider');
    }
    return context;
};
