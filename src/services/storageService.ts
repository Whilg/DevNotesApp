import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/firebase';

export const uploadImageAsync = async (uri: string): Promise<string> => {
    try{
        const response = await fetch(uri);
        const blob = await response.blob();

        const fileName = `notes/${new Date().getTime()}`;
        const storageRef = ref(storage, fileName);

        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error("Erro ao fazer o upload da imagem:", error);
        throw error;
    }
};