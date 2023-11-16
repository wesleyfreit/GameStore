import React from 'react';
import { Text } from 'react-native';
import { titleStyle } from '../styles';

export const TitleModal = ({ text }: TitleGuideFunctionProps) => (
  <Text style={{ ...titleStyle.titleModal }}>{text}</Text>
);
