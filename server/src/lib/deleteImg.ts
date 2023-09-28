import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../db/firebase';

const deleteImg = async (imageUrl: string) => {
  try {
    const local: RegExpMatchArray | null = imageUrl
      .replace('%', '/')
      .match(/uploads.*?(jpg|jpeg|webp|png)/);
    if (local) {
      const storageRef = ref(storage, local[0]);
      await deleteObject(storageRef);
    }
  } catch (error) {
    return error;
  }
};

export default deleteImg;
