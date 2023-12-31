import React from 'react';
import { StatusBar } from 'react-native';
import { enableLatestRenderer } from 'react-native-maps';

import { AuthProvider } from '@/contexts/Auth';
import { Routes } from '@/routes';
import { colors } from '@/styles/global';

enableLatestRenderer();

export const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.theme.color} barStyle={'light-content'} />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};
