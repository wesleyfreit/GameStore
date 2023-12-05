import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_TOKEN_STORAGE } from '@/storage/storageConfig';

export const storageAuthTokenSave = async (token: string) => {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify(token));
};

export const storageAuthTokenGet = async () => {
  const storage = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  const token: string = storage ? JSON.parse(storage) : '';

  return token;
};

export const storageAuthTokenRemove = async () => {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
};
