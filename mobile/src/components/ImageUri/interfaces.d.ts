import { DimensionValue } from 'react-native';

interface ImageUriComponentProps {
  imageUri: string;
  styles: {
    width: number | DimensionValue;
    height: number | DimensionValue;
    borderRadius?: number;
    position?: 'absolute' | 'relative' | undefined;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    zIndex?: number;
    opacity?: number;
  };
}
