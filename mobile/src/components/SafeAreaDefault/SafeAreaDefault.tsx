import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaDefaultComponentProps } from './interfaces';
import { containerStyle } from './styles';

export const SafeAreaDefault = ({
  children,
  paddingHorizontal,
  justifyContent,
}: SafeAreaDefaultComponentProps) => {
  return (
    <SafeAreaView style={{ ...containerStyle, paddingHorizontal, justifyContent }}>
      {children}
    </SafeAreaView>
  );
};
