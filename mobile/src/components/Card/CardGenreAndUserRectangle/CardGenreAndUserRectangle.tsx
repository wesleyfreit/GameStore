import React from 'react';
import { Text, View } from 'react-native';

import { ClickableText } from '@/components/ClickableText';
import {
  cardContainerStyle,
  cardTitleStyle,
  cardUserInfoStyle,
  cardViewActionsStyle,
  cardViewButtonStyle,
  cardViewTextStyle,
  cardViewUserInfoStyle,
} from './styles';

export const CardGenreAndUserRectangle = ({
  genre,
  user,
  toEdit,
  toRemove,
}: CardGenreRectangleComponentProps) => {
  return (
    <View key={genre ? genre.id : user?.id} style={cardContainerStyle}>
      <View style={cardViewTextStyle}>
        <Text style={cardTitleStyle}>{genre ? genre.name : user?.username}</Text>
      </View>

      <View style={cardViewActionsStyle}>
        {user ? (
          <View style={cardViewUserInfoStyle}>
            <Text style={cardUserInfoStyle}>{user.isAdmin ? 'admin' : 'user'}</Text>
          </View>
        ) : (
          <></>
        )}

        <View style={cardViewButtonStyle}>
          <ClickableText
            color="warning"
            textClickable={user ? 'Alterar' : 'Editar'}
            onClick={toEdit}
          />

          {!user ? (
            <ClickableText color="danger" textClickable="Remover" onClick={toRemove} />
          ) : (
            <></>
          )}
        </View>
      </View>
    </View>
  );
};
