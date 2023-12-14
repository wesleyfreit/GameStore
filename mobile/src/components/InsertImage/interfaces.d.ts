import { Control, FieldErrors } from 'react-hook-form';

interface InsertImageComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors: FieldErrors<{
    image: string;
  }>;
  setPreview: (value: string | null) => void;
  setImageType: (value: string | null) => void;
  preview: string | null;
  imageUrl: string | null;
}

interface InsertImageErrorProps {
  didCancel?: boolean | undefined;
  errorMessage?: string | undefined;
}
