import { StyleSheet } from 'react-native';
import { colors } from '../../styles/global';

export const buttonStyle = StyleSheet.create({
  buttonBackground: {
    height: 53,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text.color,
  },
});
