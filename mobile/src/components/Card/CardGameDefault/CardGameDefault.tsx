import { URL_API } from '@env';
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { colors, screenWidth } from '@/styles/global';
import { Icon } from '../../Icon';
import {
  cardButtonStyle,
  cardButtonTextStyle,
  cardContainerStyle,
  cardImgStyle,
  cardTitleStyle,
  cardViewButtonStyle,
  cardViewTextStyle,
  cardYearStyle,
} from './styles';

export const CardGameDefault = ({
  game,
  toGame,
  addToCart,
}: CardDefaultComponentProps) => {
  const formatCurrency = (value: number) => {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

    return formattedValue;
  };

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
          <Text style={cardYearStyle}>{game.year}</Text>
        </View>
        <View style={cardViewButtonStyle}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={cardButtonStyle}
            onPress={addToCart}
          >
            <Icon
              iconName="cart"
              size={15}
              color={colors.text.color}
              strokeWidth={'2.8'}
            />
            <Text style={cardButtonTextStyle}>{formatCurrency(game.price)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
