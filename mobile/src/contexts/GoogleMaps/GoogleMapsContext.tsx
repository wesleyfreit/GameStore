import { createContext } from 'react';
import { type GoogleMapsContextProps } from './interfaces';

export const GoogleMapsContext = createContext<GoogleMapsContextProps>({
  coords: undefined,
  setCoords: () => {},
});
