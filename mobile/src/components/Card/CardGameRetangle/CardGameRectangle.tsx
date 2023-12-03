import { URL_API } from '@env';
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';

import { ClickableText } from '@/components/ClickableText';
import { screenWidth } from '@/styles/global';
import {
  cardContainerStyle,
  cardImgStyle,
  cardTitleStyle,
  cardViewButtonStyle,
  cardViewTextStyle,
} from './styles';

export const CardGameRectangle = ({
  game,
  toGame,
  toEdit,
  toRemove,
}: CardRectangleComponentProps) => {
  // const formatCurrency = (value: number) => {
  //   const formattedValue = new Intl.NumberFormat('pt-BR', {
  //     style: 'currency',
  //     currency: 'BRL',
  //   }).format(value);

  //   return formattedValue;
  // };

  return (
    <TouchableWithoutFeedback onPress={toGame}>
      <View key={game.id} style={cardContainerStyle}>
        <Image
          source={{
            uri: URL_API.concat(game.imageUrl),
          }}
          style={cardImgStyle}
        />
        <View style={cardViewTextStyle}>
          <Text style={cardTitleStyle}>
            {game.title.length <= screenWidth / 22
              ? game.title
              : game.title.substring(0, screenWidth / 22).concat('...')}
          </Text>
        </View>
        <View style={cardViewButtonStyle}>
          <ClickableText color="warning" textClickable="Editar" onClick={toEdit} />
          <ClickableText color="danger" textClickable="Remover" onClick={toRemove} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
