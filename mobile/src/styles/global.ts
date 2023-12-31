import { Dimensions, StyleSheet } from 'react-native';

export const screenWidth = Dimensions.get('screen').width;

export const colors = StyleSheet.create({
  primary: {
    color: '#5B33CE',
  },
  border: {
    color: '#484848',
  },
  sub: {
    color: '#919191',
  },
  card: {
    color: '#263241',
  },
  warning: {
    color: '#FFCA0F',
  },
  danger: {
    color: '#DB2323',
  },
  success: {
    color: '#008334',
  },
  theme: {
    color: '#171D25',
  },
  text: {
    color: '#F2F2F2',
  },
  input: {
    color: '#181A21',
  },
});
