/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FieldErrors } from 'react-hook-form';
import { type InputModeOptions } from 'react-native';

interface InputComponentProps {
  iconName?: keyof IconName;
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
  onClick?: () => void;
}

type IconName = {
  mail: undefined;
  password: undefined;
  point: undefined;
  user: undefined;
};