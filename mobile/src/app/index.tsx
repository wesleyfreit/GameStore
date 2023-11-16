import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StatusBar } from 'react-native';
import { enableLatestRenderer } from 'react-native-maps';

import { SetAdress } from '@/app/auth/SetAddress';
import { SignIn } from '@/app/auth/SignIn';
import { SignUp } from '@/app/auth/SignUp';
import { GoogleMapsProvider } from '@/providers/GoogleMaps/GoogleMapsProvider';
import { colors } from '@/styles/global';

const Stack = createNativeStackNavigator();
enableLatestRenderer();

export default () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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
        <GoogleMapsProvider>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />

            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: 'Criar Conta',
                animation: 'slide_from_right',
                animationDuration: 300,
                headerTitleAlign: 'center',
                headerShadowVisible: false,
              }}
            />

            <Stack.Screen
              name="SetAddress"
              component={SetAdress}
              options={{
                title: 'Selecionar endereço',
                animation: 'slide_from_right',
                animationDuration: 300,
                headerTitleAlign: 'center',
                headerShadowVisible: false,
              }}
            />
          </Stack.Navigator>
        </GoogleMapsProvider>
      </NavigationContainer>
    </>
  );
};
