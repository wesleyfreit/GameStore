import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundImageStyle: {
    flex: 1,
    marginTop: 10,
    position: 'relative',
  },
  imageStyle: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardStyle: {
    backgroundColor: '#171d25dd',
    padding: 20,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    gap: 5,
  },
  aboutTitleStyle: {
    color: colors.text.color,
    fontWeight: '600',
    fontSize: 16,
  },
  aboutDescriptionStyle: {
    color: colors.text.color,
    fontWeight: '500',
  },
});

export const {
  backgroundImageStyle,
  imageStyle,
  cardStyle,
  aboutTitleStyle,
  aboutDescriptionStyle,
} = styles;
