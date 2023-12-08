import React from 'react';
import { Text, View } from 'react-native';
import { containerStyle, textStyle } from './styles';

export const TitleSearch = ({ value }: { value: string }) => {
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>Resultados para &ldquo;{value}&ldquo;.</Text>
    </View>
  );
};
