import { ThemeType } from "../constants/themes";

export type Note = {
    id: string;
    title: string;
    category: 'Bug' | 'Feature' | 'Ideia';
    content: string;
    imageUri?: string;
};

export type RootStackParamList = {
    Welcome: undefined;
    Home: undefined;
    AddNote: { noteToEdit?: Note } | undefined;
    NoteDetail: { noteId: string };
    Store: undefined;
    Payment: { themeToBuy: ThemeType };
};