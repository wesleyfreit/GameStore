import React from 'react';
import { Text } from 'react-native';
import { titleGuideStyle } from './styles';

export const TitleGuide = ({ text, fontsize }: TitleGuideComponentProps) => (
  <Text style={{ ...titleGuideStyle, fontSize: fontsize ? fontsize : 20 }}>{text}</Text>
);
