import React from 'react';
import { Text, View } from 'react-native';

import { ClickableText } from '@/components/ClickableText';
import {
  cardContainerStyle,
  cardTitleStyle,
  cardViewButtonStyle,
  cardViewTextStyle,
} from './styles';

export const CardGenreAndUserRectangle = ({
  genre,
  toEdit,
  toRemove,
}: CardGenreRectangleComponentProps) => {
  return (
    <View key={genre.id} style={cardContainerStyle}>
      <View style={cardViewTextStyle}>
        <Text style={cardTitleStyle}>{genre.name}</Text>
      </View>
      <View style={cardViewButtonStyle}>
        <ClickableText color="warning" textClickable="Editar" onClick={toEdit} />
        <ClickableText color="danger" textClickable="Remover" onClick={toRemove} />
      </View>
    </View>
  );
};
