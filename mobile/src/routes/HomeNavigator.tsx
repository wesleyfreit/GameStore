import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CartScreen } from '@/app/home/CartScreen';
import { GameScreen } from '@/app/home/GameScreen';
import { HomeScreen } from '@/app/home/HomeScreen';
import { SearchScreen } from '@/app/home/SearchScreen';

const Stack = createNativeStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Cart" component={CartScreen} />

      <Stack.Screen name="Search" component={SearchScreen} />

      <Stack.Screen name="Game" component={GameScreen} />
    </Stack.Navigator>
  );
};
