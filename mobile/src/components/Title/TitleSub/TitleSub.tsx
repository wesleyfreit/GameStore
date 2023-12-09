import React from 'react';
import { Text, View } from 'react-native';
import { containerStyle, textStyle } from './styles';

export const TitleSub = ({ value }: { value: string }) => {
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{value}</Text>
    </View>
  );
};
