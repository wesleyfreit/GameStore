import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ModalLoading } from '@/components/Modal/ModalLoading';
import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/styles/global';
import { AuthRoutes } from './auth.routes';
import { MainRoutes } from './home.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export const Routes = () => {
  const { user, isLoadingUserStorageData } = useAuth();

  if (isLoadingUserStorageData) {
    return <ModalLoading />;
  }

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
          <Screen name="Main" component={MainRoutes} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};
