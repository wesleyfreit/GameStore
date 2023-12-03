import { StyleSheet } from 'react-native';
import { colors, screenWidth } from '../../styles/global';

const styles = StyleSheet.create({
  insertImageBackgroundStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: colors.input.color,
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    height: 130,
    position: 'relative',
  },
  insertImageImageStyle: {
    width: screenWidth / 1.2 - 5,
    height: 128,
    position: 'absolute',
    zIndex: -1,
    borderRadius: 8,
    opacity: 0.5,
  },
  insertImageTextStyle: {
    color: colors.text.color,
  },
});

export const { insertImageBackgroundStyle, insertImageImageStyle, insertImageTextStyle } =
  styles;
