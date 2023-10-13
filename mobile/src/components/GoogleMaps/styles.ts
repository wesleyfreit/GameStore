import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('screen');

export const googleMapsStyles = StyleSheet.create({
  container: {
    minHeight: height / 1.5,
    flex: 1
  },
  map: {
    height: height / 1.5,
    width: width / 1.2 < 340 ? width / 1.2 : 340,
  },
});
