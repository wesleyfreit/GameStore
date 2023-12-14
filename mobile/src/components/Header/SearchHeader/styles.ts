import { screenWidth } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  searchHeaderContainerStyle: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  searchHeaderTextStyle: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  searchBarInputStyle: {
    width: screenWidth / 1.4,
  },
});

export const { searchHeaderContainerStyle, searchHeaderTextStyle, searchBarInputStyle } =
  styles;
