import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  ViewAuthContainerStyle: {
    gap: 15,
    marginVertical: 15,
    width: width / 1.2 < 340 ? width / 1.2 + 2 * 20 : 340 + 2 * 20,
    paddingHorizontal: 20,
  },
});

export const { ViewAuthContainerStyle } = styles;
