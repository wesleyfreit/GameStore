import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  checkBoxContainerStyle: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  checkBoxStyle: {
    width: 20,
    height: 20,
    borderRadius: 8,
    borderColor: colors.border.color,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkBoxTextStyle: {
    fontSize: 14,
  },
});

export const { checkBoxContainerStyle, checkBoxStyle, checkBoxTextStyle } = styles;
