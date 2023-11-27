import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { colors } from '@/styles/global';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export const Routes = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  return (
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
      <Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Screen name="Auth" component={AuthRoutes} />
        ) : (
          <Screen name="App" component={AppRoutes} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};
