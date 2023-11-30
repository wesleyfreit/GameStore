import React from 'react';
import { Text } from 'react-native';
import { titleGuideStyle } from './styles';

export const TitleGuide = ({ text }: TitleGuideComponentProps) => (
  <Text style={{ ...titleGuideStyle }}>{text}</Text>
);
