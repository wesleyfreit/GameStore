import { ClickableText } from '@/components/ClickableText';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DimensionValue } from 'react-native';

interface ClickableTextFunctionProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  navigateLocation?: string;
  textDefault?: string;
  textClickable: string;
  marginLeft?: DimensionValue;
  color?: string;
}
