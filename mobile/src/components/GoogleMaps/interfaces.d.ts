import { Region } from 'react-native-maps';

interface GoogleMapsComponentProps {
  setPoint: (e: Region) => void;
  point: Region | undefined;
}
