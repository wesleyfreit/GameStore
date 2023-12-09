import { colors } from '@/styles/global';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  titleTextStyle: { fontWeight: '600', color: colors.text.color },
  describeTextStyle: { color: colors.primary.color },
});

export const { titleTextStyle, describeTextStyle } = styles;
