import AsyncStorage from '@react-native-async-storage/async-storage';

import { USER_STORAGE } from './storageConfig';

export const storageUserSave = async (user: IUser) => {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
};

export const storageUserGet = async () => {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: IUser = storage ? JSON.parse(storage) : {};

  return user;
};
