import { Control, FieldErrors } from 'react-hook-form';

interface SelectComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors: FieldErrors<{
    genre: string;
  }>;
  array: IGenre[];
  setItem: (value: string | null) => void;
  item: string | null;
}
