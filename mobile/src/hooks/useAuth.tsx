import { AuthContext } from '@/contexts/Auth';
import { useContext } from 'react';

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
