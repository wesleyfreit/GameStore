import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerStyle: {
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  textStyle: {
    color: colors.text.color,
    fontSize: 16,
  },
});

export const { containerStyle, textStyle } = styles;
