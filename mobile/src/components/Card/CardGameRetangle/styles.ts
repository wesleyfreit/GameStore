import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainerStyle: {
    backgroundColor: colors.card.color,
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
  },
  cardImgStyle: {
    width: 140,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardViewTextStyle: {
    marginLeft: 10,
    width: 110,
    justifyContent: 'center',
  },
  cardTitleStyle: {
    marginTop: 5,
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
  cardPriceStyle: {
    color: colors.text.color,
    fontWeight: '700',
  },
});

export const {
  cardContainerStyle,
  cardImgStyle,
  cardViewTextStyle,
  cardTitleStyle,
  cardViewButtonStyle,
  cardPriceStyle,
} = styles;
