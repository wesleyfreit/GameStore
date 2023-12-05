import React from 'react';
import { listEmptyTextStyle } from './styles';
import { Text, View } from 'react-native';

export const ListEmpty = ({ text }: EmptyListComponentProps) => {
  return (
    <View>
      <Text style={listEmptyTextStyle}>{text}</Text>
    </View>
  );
};
