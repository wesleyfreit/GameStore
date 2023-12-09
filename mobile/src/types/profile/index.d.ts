import { IconName } from '@/components/Input/interfaces';
import { type InputModeOptions } from 'react-native';

interface EditProfileInput {
  title: string;
  iconName: keyof IconName;
  name: keyof ProfileProps;
  type?: InputModeOptions;
  text: string;
  secure?: boolean;
  isDelete?: boolean;
}

interface ProfileProps {
  username?: string;
  address?: string;
  email?: string;
  password?: string;
  new_password?: string;
  point?: string[];
}
