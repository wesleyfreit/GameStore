import { type ReactNode } from 'react';

interface AuthContextProps {
  user: IUser | undefined;
  setUser: (user: IUser) => void;
  isLoadingUserStorageData: boolean;
  setUserAndToken: (userData: IUser, token: string) => void;
  removeUserAndToken: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
