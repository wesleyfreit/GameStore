import React from 'react';
import { Text } from 'react-native';

import { descriptorStyle } from './styles';

export const Descriptor = ({ text, fontsize, color }: DescriptorComponentProps) => {
  return (
    <Text
      style={{
        ...descriptorStyle,
        fontSize: fontsize ? fontsize : 14,
        color: color,
      }}
    >
      {text}
    </Text>
  );
};
