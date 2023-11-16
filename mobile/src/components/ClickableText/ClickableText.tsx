import { Text, TouchableOpacity } from 'react-native';

import { colors } from '@/styles/global';
import { ClickableTextFunctionProps } from './interfaces';
import { clickableStyle } from './styles';

export const ClickableText = ({
  navigation,
  navigateLocation,
  textDefault,
  textClickable,
  marginLeft,
  color,
}: ClickableTextFunctionProps) => {
  const selectColor =
    color == 'success'
      ? colors.success.color
      : color === 'warning'
      ? colors.warning.color
      : color === 'danger'
      ? colors.danger.color
      : colors.primary.color;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => (navigateLocation ? navigation.push(navigateLocation) : navigation.goBack())}
      style={{ alignItems: 'center', marginLeft: marginLeft }}
    >
      <Text>
        {textDefault}
        <Text style={{ color: selectColor, ...clickableStyle.clickableMode }}>{textClickable}</Text>
      </Text>
    </TouchableOpacity>
  );
};
