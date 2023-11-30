import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { selectColor } from '@/lib/selectColor';
import { type ClickableTextComponentProps } from './interfaces';
import { clickableTextStyle, defaultTextStyle } from './styles';

export const ClickableText = ({
  textNotClickable,
  textClickable,
  marginLeft,
  color,
  onClick,
}: ClickableTextComponentProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      style={{ alignItems: 'center', marginLeft: marginLeft }}
    >
      <Text style={defaultTextStyle}>
        {textNotClickable}
        <Text style={{ color: selectColor(color), ...clickableTextStyle }}>
          {textClickable}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};
