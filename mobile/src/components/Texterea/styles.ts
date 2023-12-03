import { StyleSheet } from 'react-native';
import { colors } from '../../styles/global';

const styles = StyleSheet.create({
  textereaBackgroundStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    backgroundColor: colors.input.color,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    minHeight: 53,
  },
  textereaPropsStyle: {
    color: colors.text.color,
    alignItems: 'flex-start',
  },
});

export const { textereaBackgroundStyle, textereaPropsStyle } = styles;
