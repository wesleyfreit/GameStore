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
    new_password: string;
    repeatPassword?: any;
    title: string;
    price: number;
    year: number;
    description: string;
    genre: string;
    disponibility: string;
    name: string;
  }>;
  error?: string;
  changeMessage?: (value: string) => void;
}

type IconName = {
  mail: undefined;
  password: undefined;
  point: undefined;
  user: undefined;
  search: undefined;
};
