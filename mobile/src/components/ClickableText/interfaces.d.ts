import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DimensionValue } from "react-native";

export interface FunctionProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  navigateLocation?: string;
  textDefault?: string;
  textClickable: string;
  marginLeft?: DimensionValue;
  color?: string;
}
