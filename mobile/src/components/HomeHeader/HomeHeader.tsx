import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../Icon';

import Logo from '@/assets/svgs/logo.svg';
import { colors } from '@/styles/global';
import {
  homeHeaderActionsSideStyle,
  homeHeaderContainerStyle,
  homeHeaderLogoSideStyle,
  homeHeaderLogoTextStyle,
} from './styles';

export const HomeHeader = ({ toCart, toSearch }: HomeHeaderComponentProps) => {
  return (
    <View style={homeHeaderContainerStyle}>
      <View style={homeHeaderLogoSideStyle}>
        <Logo width={30} height={40} />
        <Text style={homeHeaderLogoTextStyle}>
          GAME<Text style={{ color: colors.text.color }}>STORE</Text>
        </Text>
      </View>
      <View style={homeHeaderActionsSideStyle}>
        <TouchableOpacity onPress={toSearch}>
          <Icon iconName="search" color={colors.text.color} size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toCart}>
          <Icon iconName="cart" color={colors.text.color} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
