import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { colors, screenWidth } from '@/styles/global';
import { containerStyle, modeBtnStyle } from './styles';

export const ItemEditProfile = ({
  title,
  text,
  onClick,
  modeBtn,
  iconName,
}: ItemEditProfileComponentProps) => {
  return (
    <View style={containerStyle}>
      {!modeBtn ? (
        <>
          <View>
            <Text style={{ color: colors.sub.color }}>{title}</Text>

            <Text style={{ color: colors.text.color, width: screenWidth / 1.5 }}>
              {text}
            </Text>
          </View>

          <TouchableOpacity onPress={onClick} activeOpacity={0.7}>
            <Icon iconName={'edit'} color={colors.text.color} size={24} />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={onClick} style={modeBtnStyle} activeOpacity={0.7}>
          <Icon iconName={iconName as string} color={colors.danger.color} size={24} />

          <Text style={{ color: colors.danger.color, fontSize: 15 }}>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
