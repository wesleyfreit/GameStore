import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    paddingBottom: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: colors.border.color,
    borderTopWidth: 1.5,
    borderLeftWidth: 0.01,
    borderRightWidth: 0.01,
  },

  tabBarImageStyle: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 30,
  },
});

export const { tabBarStyle, tabBarImageStyle } = styles;
