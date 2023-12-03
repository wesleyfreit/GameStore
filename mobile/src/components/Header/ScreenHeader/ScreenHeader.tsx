import { Icon } from '@/components/Icon';
import { TitleDefault } from '@/components/Title/TitleDefault';
import { colors } from '@/styles/global';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { screenHeaderContainerStyle, screenHeaderTextStyle } from './styles';

export const ScreenHeader = ({ title, toBack }: ScreenHeaderComponentProps) => {
  return (
    <View style={screenHeaderContainerStyle}>
      <TouchableOpacity onPress={toBack}>
        <Icon color={colors.text.color} iconName={'return'} size={24} />
      </TouchableOpacity>
      <View style={screenHeaderTextStyle}>
        <TitleDefault text={title} />
      </View>
    </View>
  );
};
