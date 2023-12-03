import { StyleSheet } from 'react-native';
import { colors } from '../../styles/global';

const styles = StyleSheet.create({
  selectContainerStyle: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: colors.input.color,
  },
  selectBackgroundStyle: {
    color: colors.border.color,
  },
});

export const { selectContainerStyle, selectBackgroundStyle } = styles;
