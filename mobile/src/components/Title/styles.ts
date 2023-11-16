import { StyleSheet } from 'react-native';
import { colors } from '../../styles/global';

export const titleStyle = StyleSheet.create({
  titleGuide: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary.color,
  },
  titleModal: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.color
  }
});
