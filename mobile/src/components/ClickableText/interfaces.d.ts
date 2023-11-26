import { type ParamListBase } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type DimensionValue } from 'react-native';

interface ClickableTextComponentProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  navigateLocation?: string;
  textNotClickable?: string;
  textClickable: string;
  marginLeft?: DimensionValue;
  color?: string;
  onClick?: () => void;
}
