import { type ReactNode } from 'react';
import { type Region } from 'react-native-maps';

interface GoogleMapsProviderProps {
  children: ReactNode;
}

interface GoogleMapsCoords {
  coords: Region | undefined;
}
