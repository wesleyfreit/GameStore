import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  homeHeaderContainerStyle: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 7,
  },
  homeHeaderLogoSideStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  homeHeaderLogoTextStyle: {
    fontFamily: 'Inder-Regular',
    fontSize: 20,
    color: colors.primary.color,
  },
  homeHeaderActionsSideStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});

export const {
  homeHeaderContainerStyle,
  homeHeaderActionsSideStyle,
  homeHeaderLogoTextStyle,
  homeHeaderLogoSideStyle,
} = styles;
