import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainerStyle: {
    backgroundColor: colors.card.color,
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
    padding: 5,
  },
  cardViewTextStyle: {
    marginLeft: 10,
    width: 110,
    justifyContent: 'center',
  },
  cardTitleStyle: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.text.color,
    flexWrap: 'wrap',
  },
  cardViewButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginLeft: 'auto',
    gap: 10,
  },
});

export const {
  cardContainerStyle,
  cardViewTextStyle,
  cardTitleStyle,
  cardViewButtonStyle,
} = styles;
