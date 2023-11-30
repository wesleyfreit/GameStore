import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  defaultTextStyle: {
    color: colors.text.color,
  },
  clickableTextStyle: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export const { defaultTextStyle, clickableTextStyle } = styles;
