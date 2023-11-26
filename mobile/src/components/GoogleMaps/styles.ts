import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  mapContainerStyle: {
    minHeight: height / 1.5,
    flex: 1,
  },
  mapStyle: {
    height: height / 1.5,
    width: width / 1.2 < 340 ? width / 1.2 : 340,
  },
});

export const { mapContainerStyle, mapStyle } = styles;
