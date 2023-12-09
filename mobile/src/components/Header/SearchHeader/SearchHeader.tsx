import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { colors } from '@/styles/global';
import {
  searchBarInputStyle,
  searchHeaderContainerStyle,
  searchHeaderTextStyle,
} from './styles';

export const SearchHeader = ({
  toBack,
  toSearch,
  value,
  setValue,
}: SearchHeaderComponentProps) => {
  return (
    <View style={searchHeaderContainerStyle}>
      <View style={searchHeaderTextStyle}>
        <TouchableOpacity onPress={toBack}>
          <Icon color={colors.text.color} iconName={'return'} size={24} />
        </TouchableOpacity>

        <TextInput
          placeholder={'O que deseja?'}
          onSubmitEditing={toSearch}
          returnKeyType="search"
          value={value}
          onChangeText={setValue}
          style={searchBarInputStyle}
        />
      </View>

      <TouchableOpacity activeOpacity={0.4} onPress={toSearch}>
        <Icon iconName={'search'} color={colors.text.color} size={24} />
      </TouchableOpacity>
    </View>
  );
};
