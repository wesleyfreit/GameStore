import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Logo from '@/assets/svgs/logo.svg';
import { Icon } from '@/components/Icon';
import { colors } from '@/styles/global';
import {
  homeHeaderActionsSideStyle,
  homeHeaderContainerStyle,
  homeHeaderLogoSideStyle,
  homeHeaderLogoTextStyle,
} from './styles';

export const HomeHeader = ({
  toCart,
  toSearch,
  cartLength,
}: HomeHeaderComponentProps) => {
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
        <TouchableOpacity
          onPress={toCart}
          style={{
            position: 'relative',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
          }}
        >
          <Icon iconName="cart" color={colors.text.color} size={24} />
          {cartLength > 0 ? (
            <View
              style={{
                backgroundColor: colors.danger.color,
                position: 'absolute',
                borderRadius: 100,
                paddingVertical: 2,
                paddingHorizontal: 6,
                marginTop: -7,
              }}
            >
              <Text
                style={{
                  color: colors.text.color,
                  fontWeight: '900',
                  fontSize: 10,
                  textAlign: 'center',
                }}
              >
                {cartLength > 9 ? `9⁺` : cartLength}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
