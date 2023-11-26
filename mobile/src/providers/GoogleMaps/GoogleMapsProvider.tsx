import React, { useState } from 'react';
import { GoogleMapsContext } from '@/contexts/GoogleMaps/GoogleMapsContext';
import { type GoogleMapsCoords, type GoogleMapsProviderProps } from './interfaces';

export const GoogleMapsProvider = ({ children }: GoogleMapsProviderProps) => {
  const [coords, setCoords] = useState<GoogleMapsCoords['coords']>(undefined);
  return (
    <GoogleMapsContext.Provider value={{ coords, setCoords }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
