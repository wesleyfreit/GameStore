import { Control } from 'react-hook-form';

interface CheckBoxComponentProps {
  disponible: boolean;
  setDisponible: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}
