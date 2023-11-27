import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SetAdressScreen } from '@/screens/auth/SetAddressScreen';
import { SignInScreen } from '@/screens/auth/SignInScreen';
import { SignUpScreen } from '@/screens/auth/SignUpScreen';
import { GoogleMapsProvider } from '@/providers/GoogleMaps/GoogleMapsProvider';

const Stack = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <GoogleMapsProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
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
          component={SetAdressScreen}
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
  );
};
