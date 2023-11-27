import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { enableLatestRenderer } from 'react-native-maps';

import { AppNavigator } from '@/routes';
import { colors } from '@/styles/global';

enableLatestRenderer();

export const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return (
    <>
      <StatusBar backgroundColor={colors.theme.color} barStyle={'light-content'} />
      <NavigationContainer
        theme={{
          colors: {
            primary: colors.primary.color,
            background: colors.theme.color,
            text: colors.text.color,
            card: colors.theme.color,
            border: colors.border.color,
            notification: 'default',
          },
          dark: true,
        }}
      >
        <AppNavigator />
      </NavigationContainer>
    </>
  );
};
