import { URL_API } from '@env';
import React from 'react';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { ImageUri } from '@/components/ImageUri';
import { selectColor } from '@/lib/selectColor';
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
  disableBuy,
  disponible,
  bgColor,
  bought,
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
        <ImageUri imageUri={URL_API.concat(game.imageUrl)} styles={cardImgStyle} />

        <View style={cardViewTextStyle}>
          <Text style={cardTitleStyle}>
            {game.title.length <= screenWidth / 22
              ? game.title
              : game.title.substring(0, screenWidth / 22).concat('...')}
          </Text>
          <Text style={cardYearStyle}>{game.year}</Text>
        </View>

        {!disableBuy ? (
          <View style={cardViewButtonStyle}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                ...cardButtonStyle,
                backgroundColor: selectColor(bgColor),
              }}
              onPress={addToCart}
              disabled={!disponible || bought}
            >
              <Icon
                iconName={bought ? 'check' : disponible ? 'cart' : 'close'}
                size={15}
                color={colors.text.color}
                strokeWidth={'2.8'}
              />

              <Text style={cardButtonTextStyle}>
                {bought
                  ? 'Comprado'
                  : disponible
                    ? formatCurrency(game.price)
                    : 'Indisponível'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
