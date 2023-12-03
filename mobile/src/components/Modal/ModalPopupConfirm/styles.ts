import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalBackgroundStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerStyle: {
    gap: 15,
    width: '85%',
    backgroundColor: colors.theme.color,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 3,
  },
});

export const { modalBackgroundStyle, modalContainerStyle } = styles;
