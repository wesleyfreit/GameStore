import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainerStyle: {
    backgroundColor: colors.card.color,
    borderRadius: 10,
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  cardViewTextStyle: {
    justifyContent: 'center',
  },
  cardTitleStyle: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.text.color,
  },
  cardViewActionsStyle: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
  },
  cardViewUserInfoStyle: {
    width: 40,
  },
  cardUserInfoStyle: {
    textAlign: 'center',
    color: colors.success.color,
  },
  cardViewButtonStyle: {
    gap: 5,
  },
});

export const {
  cardContainerStyle,
  cardViewTextStyle,
  cardTitleStyle,
  cardViewActionsStyle,
  cardViewUserInfoStyle,
  cardUserInfoStyle,
  cardViewButtonStyle,
} = styles;
