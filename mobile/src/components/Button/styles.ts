import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonBackgroundStyle: {
    height: 53,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.text.color,
  },
});

export const { buttonBackgroundStyle, buttonTextStyle } = styles;
