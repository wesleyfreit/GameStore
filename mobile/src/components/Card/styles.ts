import { colors, screenWidth } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainerStyle: {
    backgroundColor: colors.card.color,
    paddingBottom: 7,
    borderRadius: 10,
  },
  cardImgStyle: {
    width: screenWidth <= 410 ? screenWidth / 2.2 : 187,
    height: 75,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardViewTextStyle: {
    paddingHorizontal: 6,
  },
  cardTitleStyle: {
    marginTop: 5,
    fontWeight: '500',
    fontSize: 16,
    color: colors.text.color,
  },
  cardYearStyle: {
    marginTop: 1,
    fontWeight: '900',
    fontSize: 14,
    color: colors.primary.color,
  },
  cardViewButtonStyle: { alignItems: 'center', marginTop: 17 },
  cardButtonStyle: {
    backgroundColor: colors.primary.color,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 4,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: 126,
  },
  cardButtonTextStyle: {
    fontWeight: '700',
    fontSize: 14,
    color: colors.text.color,
    textAlign: 'center',
  },
});

export const {
  cardContainerStyle,
  cardImgStyle,
  cardViewTextStyle,
  cardTitleStyle,
  cardYearStyle,
  cardViewButtonStyle,
  cardButtonStyle,
  cardButtonTextStyle,
} = styles;
