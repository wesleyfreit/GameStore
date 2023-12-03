import { screenWidth } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ViewAuthContainerStyle: {
    gap: 15,
    marginVertical: 15,
    width: screenWidth / 1.2 < 340 ? screenWidth / 1.2 + 2 * 20 : 340 + 2 * 20,
    paddingHorizontal: 20,
  },
});

export const { ViewAuthContainerStyle } = styles;
