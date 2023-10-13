import { Region } from 'react-native-maps';

export interface GoogleMapsContextProps {
  coords: Region | undefined;
  setCoords: (value: Region | undefined) => void;
}
