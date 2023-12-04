import { type ReactNode } from 'react';

interface AuthContextProps {
  user: IUser | undefined;
  setUser: (value: IUser) => void;
  isLoadingUserStorageData: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}
