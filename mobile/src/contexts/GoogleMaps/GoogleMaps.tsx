import React, { createContext, useState } from 'react';
import { Region } from 'react-native-maps';
import { type GoogleMapsContextProps, type GoogleMapsProviderProps } from './interfaces';

export const GoogleMapsContext = createContext<GoogleMapsContextProps>(
  {} as GoogleMapsContextProps,
);

export const GoogleMapsProvider = ({ children }: GoogleMapsProviderProps) => {
  const [coords, setCoords] = useState<Region>({} as Region);
  return (
    <GoogleMapsContext.Provider value={{ coords, setCoords }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
