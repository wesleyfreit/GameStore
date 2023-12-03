import { GoogleMapsContext } from '@/contexts/GoogleMaps';
import { useContext } from 'react';

export const useCoords = () => {
  const context = useContext(GoogleMapsContext);

  return context;
};
