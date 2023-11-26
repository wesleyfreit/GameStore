/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ParamListBase } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type FieldErrors } from 'react-hook-form';
import { type InputModeOptions } from 'react-native';

interface InputComponentProps {
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
  errorAuth?: string;
  changeMessage?: (value: string) => void;
  valueAddress?: string | null;

  navigation?: NativeStackNavigationProp<ParamListBase>;
}
