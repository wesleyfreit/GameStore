import React from 'react';
import { Image } from 'react-native';
import { ImageUriComponentProps } from './interfaces';

export const ImageUri = ({ imageUri, styles }: ImageUriComponentProps) => {
  return <Image source={{ uri: imageUri }} style={styles} />;
};
