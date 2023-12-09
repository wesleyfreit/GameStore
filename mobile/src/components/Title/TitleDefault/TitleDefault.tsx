import React, { Text } from 'react-native';
import { titleModalStyle } from './styles';

export const TitleDefault = ({ text, align }: TitleModalProps) => (
  <Text style={{ ...titleModalStyle, textAlign: align ? align : 'center' }}>{text}</Text>
);
