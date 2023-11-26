import React from 'react';
import { Text } from 'react-native';
import { titleStyle } from './styles';

export const TitleGuide = ({ text }: TitleGuideComponentProps) => (
  <Text style={{ ...titleStyle.titleGuide }}>{text}</Text>
);
