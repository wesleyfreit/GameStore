import { ReactNode, useState } from 'react';

import { GoogleMapsContext } from '@/contexts/GoogleMaps/GoogleMapsContext';
import { GoogleMapsProviderProps } from './interfaces';

export const GoogleMapsProvider = ({ children }: { children: ReactNode }) => {
  const [coords, setCoords] = useState<GoogleMapsProviderProps['coords']>(undefined);
  return (
    <GoogleMapsContext.Provider value={{ coords, setCoords }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}
