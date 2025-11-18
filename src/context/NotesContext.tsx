// src/context/NotesContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Note } from '../types';
import { db } from '../config/firebase'; // Importe o Firestore
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { uploadImageAsync } from '../services/storageService'; // Importe o serviço de upload


type NotesContextType = {
  notes: Note[];
  loading: boolean;
  addNote: (newNoteData: Omit<Note, 'id'>) => Promise<void>;
  updateNote: (updatedNote: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const notesCollectionRef = collection(db, "notes");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(notesCollectionRef, (querySnapshot) => {
      const notesData: Note[] = [];
      querySnapshot.forEach((doc) => {
        notesData.push({ ...doc.data(), id: doc.id } as Note);
      });
      setNotes(notesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const addNote = async (newNoteData: Omit<Note, 'id'>) => {
    try {
      let finalImageUri = newNoteData.imageUri;

      if (newNoteData.imageUri && newNoteData.imageUri.startsWith('file://')) {
        setLoading(true);
        finalImageUri = await uploadImageAsync(newNoteData.imageUri);
      }
      
      await addDoc(notesCollectionRef, {
        ...newNoteData,
        imageUri: finalImageUri || undefined 
      });

    } catch (error) {
      console.error("Erro ao adicionar nota:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (updatedNote: Note) => {
    try {
      setLoading(true);
      let finalImageUri = updatedNote.imageUri;

      if (updatedNote.imageUri && updatedNote.imageUri.startsWith('file://')) {
        finalImageUri = await uploadImageAsync(updatedNote.imageUri);
      }
      
      const noteDocRef = doc(db, "notes", updatedNote.id);
      await updateDoc(noteDocRef, {
        ...updatedNote,
        imageUri: finalImageUri || undefined
      });

    } catch (error) {
      console.error("Erro ao atualizar nota:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const noteDocRef = doc(db, "notes", id);
      await deleteDoc(noteDocRef);
    } catch (error) {
      console.error("Erro ao excluir nota:", error);
    }
  };


  return (
    <NotesContext.Provider
      value={{ notes, loading, addNote, updateNote, deleteNote }}
    >
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