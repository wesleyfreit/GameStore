import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Control, FieldErrors } from 'react-hook-form';
import { InputModeOptions } from 'react-native';

export interface InputFunctionProps {
  iconName?: string;
  name: string;
  secure?: boolean;
  type?: InputModeOptions;
  text: string;
  control: Control<any>;
  errors: FieldErrors<{
    username: string;
    email: string;
    address: string;
    password: string;
    repeatPassword?: any;
  }>;
  valueAddress?: string | null;

  navigation?: NativeStackNavigationProp<ParamListBase>;
}
