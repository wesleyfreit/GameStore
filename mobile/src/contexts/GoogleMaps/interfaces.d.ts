import { type ReactNode } from 'react';
import { type Region } from 'react-native-maps';

interface GoogleMapsContextProps {
  coords: Region;
  setCoords: (value: Region) => void;
}

interface GoogleMapsProviderProps {
  children: ReactNode;
}
