import { storageUserGet } from '@/storage/storageUser';
import { AppError } from '@/utils/AppError';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AuthContextProps, AuthProviderProps } from './interfaces';

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const loadUserData = async () => {
    try {
      const userLogged = await storageUserGet();

      if (userLogged) {
        setUser(userLogged);
        setIsLoadingUserStorageData(false);
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
    <AuthContext.Provider value={{ user, setUser, isLoadingUserStorageData }}>
      {children}
    </AuthContext.Provider>
  );
};
