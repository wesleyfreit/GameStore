import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { SignInScreen } from '@/screens/auth/SignInScreen';
import { SignUpScreen } from '@/screens/auth/SignUpScreen';
import { AuthRoutesType } from '@/types/routes';

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesType>();

export const AuthRoutes = () => {
  return (
    <Navigator>
      <Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />

      <Screen
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
    </Navigator>
  );
};
