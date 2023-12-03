import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/styles/global';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth/auth.routes';
import { StackRoutes } from './home/stack.routes';
import { TabRoutes } from './home/tab.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export const Routes = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const { user } = useAuth();

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
        {!user?.id ? (
          <Screen name="Auth" component={AuthRoutes} />
        ) : (
          <>
            <Screen
              name="Tab"
              component={TabRoutes}
              options={{ animation: 'slide_from_right', animationDuration: 300 }}
            />
            <Screen
              name="Stack"
              component={StackRoutes}
              options={{ animation: 'slide_from_right', animationDuration: 300 }}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};
