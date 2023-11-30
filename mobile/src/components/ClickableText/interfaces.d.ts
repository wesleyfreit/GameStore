import { type DimensionValue } from 'react-native';

interface ClickableTextComponentProps {
  textNotClickable?: string;
  textClickable: string;
  marginLeft?: DimensionValue;
  color?: string;
  onClick?: () => void;
}
