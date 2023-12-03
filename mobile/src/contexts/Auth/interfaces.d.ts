import { type ReactNode } from 'react';

interface AuthContextProps {
  user: UserAuth | undefined;
  setUser: (value: UserAuth) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
