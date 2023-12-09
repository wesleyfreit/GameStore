import { URL_API } from '@env';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { ClickableText } from '@/components/ClickableText';
import { ImageUri } from '@/components/ImageUri';
import { screenWidth } from '@/styles/global';
import {
  cardContainerStyle,
  cardImgStyle,
  cardPriceStyle,
  cardTitleStyle,
  cardViewButtonStyle,
  cardViewTextStyle,
} from './styles';

export const CardGameRectangle = ({
  game,
  price,
  toGame,
  toEdit,
  toRemove,
}: CardGameRectangleComponentProps) => {
  return (
    <TouchableWithoutFeedback onPress={toGame}>
      <View key={game.id} style={cardContainerStyle}>
        <ImageUri imageUri={URL_API.concat(game.imageUrl)} styles={cardImgStyle} />

        <View style={cardViewTextStyle}>
          <Text style={cardTitleStyle}>
            {game.title.length <= screenWidth / 22
              ? game.title
              : game.title.substring(0, screenWidth / 22).concat('...')}
          </Text>
        </View>

        <View style={cardViewButtonStyle}>
          {toEdit && !price ? (
            <ClickableText color="warning" textClickable="Editar" onClick={toEdit} />
          ) : (
            <Text style={cardPriceStyle}>{price}</Text>
          )}

          <ClickableText color="danger" textClickable="Remover" onClick={toRemove} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
