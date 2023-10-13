import { createContext } from 'react';
import { Region } from 'react-native-maps';
import { GoogleMapsContextProps } from './interfaces';

export const GoogleMapsContext = createContext<GoogleMapsContextProps>({
  coords: undefined,
  setCoords: (value: Region | undefined) => {},
});
