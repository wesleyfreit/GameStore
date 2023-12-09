import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ModalLoading } from '@/components/Modal/ModalLoading';
import { GoogleMapsProvider } from '@/contexts/GoogleMaps';
import { useAuth } from '@/hooks/useAuth';
import { SetAdressScreen } from '@/screens/profile/SetAddressScreen';
import { colors } from '@/styles/global';
import { AuthRoutes } from './auth.routes';
import { MainRoutes } from './main.routes';

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
      <GoogleMapsProvider>
        <Navigator>
          {!user?.id ? (
            <Screen name="Auth" component={AuthRoutes} options={{ headerShown: false }} />
          ) : (
            <Screen name="Main" component={MainRoutes} options={{ headerShown: false }} />
          )}

          <Screen
            name="SetAddress"
            component={SetAdressScreen}
            options={{
              title: 'Selecionar endereço',
              animation: 'slide_from_right',
              animationDuration: 300,
              headerTitleAlign: 'center',
              headerShadowVisible: false,
            }}
          />
        </Navigator>
      </GoogleMapsProvider>
    </NavigationContainer>
  );
};
