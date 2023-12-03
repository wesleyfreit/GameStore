import React, { Text } from 'react-native';
import { titleModalStyle } from './styles';

export const TitleDefault = ({ text }: TitleModalProps) => (
  <Text style={titleModalStyle}>{text}</Text>
);
