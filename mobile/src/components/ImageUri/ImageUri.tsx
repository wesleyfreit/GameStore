import React from 'react';
import { Image } from 'react-native';

export const ImageUri = ({ imageUri, styles }: ImageUriComponentProps) => {
  return <Image source={{ uri: imageUri }} style={styles} />;
};
