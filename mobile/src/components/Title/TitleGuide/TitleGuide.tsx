import React from 'react';
import { Text } from 'react-native';
import { titleStyle } from '../styles';

export const TitleGuide = ({ text }: TitleGuideFunctionProps) => (
  <Text style={{ ...titleStyle.titleGuide }}>{text}</Text>
);
