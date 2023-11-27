import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AuthNavigator } from './AuthNavigator';
import { HomeNavigator } from './HomeNavigator';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Dashboard" component={HomeNavigator} />
    </Stack.Navigator>
  );
};
