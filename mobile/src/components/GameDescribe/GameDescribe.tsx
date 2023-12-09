import React from 'react';
import { Text } from 'react-native';
import { describeTextStyle, titleTextStyle } from './styles';

export const GameDescribe = ({ title, describe }: GameDescribeComponentProps) => {
  return (
    <Text style={titleTextStyle}>
      {title}: <Text style={describeTextStyle}>{describe}</Text>
    </Text>
  );
};
