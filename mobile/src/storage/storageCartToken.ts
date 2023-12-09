import AsyncStorage from '@react-native-async-storage/async-storage';

import { CART_TOKEN_STORAGE } from '@/storage/storageConfig';

export const storageCartTokenSave = async (token: string) => {
  await AsyncStorage.setItem(CART_TOKEN_STORAGE, JSON.stringify(token));
};

export const storageCartTokenGet = async () => {
  const storage = await AsyncStorage.getItem(CART_TOKEN_STORAGE);

  const token: string = storage ? JSON.parse(storage) : '';

  return token;
};

export const storageCartTokenRemove = async () => {
  await AsyncStorage.removeItem(CART_TOKEN_STORAGE);
};
