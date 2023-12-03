import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screenHeaderContainerStyle: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 14,
    marginBottom: 7,
  },
  screenHeaderTextStyle: {
    alignItems: 'center',
    width: '88%',
  },
});

export const { screenHeaderContainerStyle, screenHeaderTextStyle } = styles;
