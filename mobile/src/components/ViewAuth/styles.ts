import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('screen');

export const ViewAuthStyles = StyleSheet.create({
  container: {
    gap: 15,
    marginVertical: 15,
    width: width / 1.2 < 340 ? width / 1.2 + 2 * 20 : 340 + 2 * 20,
    paddingHorizontal: 20,
  },
});
