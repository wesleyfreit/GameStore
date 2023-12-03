import React, { createContext, useState } from 'react';
import { AuthContextProps, AuthProviderProps } from './interfaces';

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserAuth>({} as UserAuth);

  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};
