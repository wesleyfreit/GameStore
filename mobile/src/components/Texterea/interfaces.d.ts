/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, type FieldErrors } from 'react-hook-form';
import { type DimensionValue } from 'react-native';

interface InputComponentProps {
  iconName?: keyof IconName;
  name: string;
  text: string;
  control: Control<any>;
  errors: FieldErrors<{
    address: string;
    description: string;
  }>;
  error?: string;
  changeMessage?: (value: string) => void;
  onClick?: () => void;
  height?: DimensionValue;
}

type IconName = {
  mail: undefined;
  password: undefined;
  point: undefined;
  user: undefined;
};
