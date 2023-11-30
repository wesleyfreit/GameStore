import { StyleSheet } from 'react-native';
import { colors } from '../../styles/global';

const styles = StyleSheet.create({
  inputBackgroundStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.input.color,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    height: 53,
  },
  inputPropsStyle: {
    width: 238,
    color: colors.text.color,
  },
});

export const { inputBackgroundStyle, inputPropsStyle } = styles;
