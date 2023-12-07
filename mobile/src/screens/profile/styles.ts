import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const profileStyles = StyleSheet.create({
  imageProfileContainer: {
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'center',
  },
  imageProfileStyle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.primary.color,
  },
  buttonChangeImageProfileStyle: {
    backgroundColor: colors.border.color,
    position: 'absolute',
    padding: 10,
    borderRadius: 20,
  },
});

export const { imageProfileContainer, imageProfileStyle, buttonChangeImageProfileStyle } =
  profileStyles;
