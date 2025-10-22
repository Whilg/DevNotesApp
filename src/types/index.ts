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
    AddNote: undefined;
    NoteDetail: { note: Note };
};