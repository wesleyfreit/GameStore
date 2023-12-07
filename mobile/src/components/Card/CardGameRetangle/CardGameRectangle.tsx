import { URL_API } from '@env';
import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { ClickableText } from '@/components/ClickableText';
import { ImageUri } from '@/components/ImageUri';
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
          <ClickableText color="warning" textClickable="Editar" onClick={toEdit} />

          <ClickableText color="danger" textClickable="Remover" onClick={toRemove} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
