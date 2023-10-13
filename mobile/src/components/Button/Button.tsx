import { colors } from '@/styles/global';
import { Text, TouchableOpacity } from 'react-native';
import { ButtonFunctionProps } from './interfaces';
import { buttonStyle } from './styles';

export const Button = ({ text, bgColor, onClick }: ButtonFunctionProps) => {
  const selectColor =
    bgColor == 'success'
      ? colors.success.color
      : bgColor === 'warning'
      ? colors.warning.color
      : bgColor === 'danger'
      ? colors.danger.color
      : colors.primary.color;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ ...buttonStyle.buttonBackground, backgroundColor: selectColor }}
      onPress={() => onClick()}
    >
      <Text style={buttonStyle.buttonTitle}>{text}</Text>
    </TouchableOpacity>
  );
};
