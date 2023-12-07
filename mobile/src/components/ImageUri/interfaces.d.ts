interface ImageUriComponentProps {
  imageUri: string;
  styles: {
    width: number;
    height: number;
    borderRadius?: number;
    position?: 'absolute' | 'relative' | undefined;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    zIndex?: number;
    opacity?: number;
  };
}
