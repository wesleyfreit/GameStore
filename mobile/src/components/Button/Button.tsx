import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { selectColor } from '@/lib/selectColor';
import { buttonBackgroundStyle, buttonTextStyle } from './styles';

export const Button = ({ text, bgColor, onClick }: ButtonComponentProps) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          ...buttonBackgroundStyle,
          backgroundColor: selectColor(bgColor),
        }}
        onPress={onClick}
      >
        <Text style={buttonTextStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
