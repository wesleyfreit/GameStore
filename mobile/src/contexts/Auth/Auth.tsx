import { api } from '@/lib/api';
import { storageAuthTokenGet, storageAuthTokenRemove } from '@/storage/storageAuthToken';
import { storageUserGet, storageUserRemove } from '@/storage/storageUser';
import { AppError } from '@/utils/AppError';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AuthContextProps, AuthProviderProps } from './interfaces';

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const setUserAndToken = (userData: IUser, token: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  const removeUserAndToken = async () => {
    await storageUserRemove();
    await storageAuthTokenRemove();

    setUser({} as IUser);
  };

  const loadUserData = async () => {
    try {
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (userLogged && token) {
        setUserAndToken(userLogged, token);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      if (isAppError) {
        Alert.alert(error.message);
      }
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        setUserAndToken,
        removeUserAndToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
