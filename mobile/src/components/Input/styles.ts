import { StyleSheet } from 'react-native';
import { colors } from '../../styles/global';

export const inputStyle = StyleSheet.create({
  inputBackground: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.input.color,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    height: 53
  },
  inputProps: {
    width: 238,
  },
});
