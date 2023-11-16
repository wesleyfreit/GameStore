import { Region } from 'react-native-maps';

interface GoogleMapsContextProps {
  coords: Region | undefined;
  setCoords: (value: Region | undefined) => void;
}
