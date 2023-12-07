import { type EditProfileInput } from '@/types/profile';
import { Control, FieldErrors } from 'react-hook-form';

interface ModalPopupInputComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  visible: boolean;
  isConfirm: () => void;
  isCancel: () => void;
  errors: FieldErrors<{
    username: string;
    email: string;
    address: string;
    password: string;
  }>;
  error?: string;
  inputProps: EditProfileInput;
  checkErrors: () => Promise<boolean>;
  changeMessage?: (value: string) => void;
}
