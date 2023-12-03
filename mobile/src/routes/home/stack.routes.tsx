import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';

import { CartScreen } from '@/screens/home/CartScreen';
import { GameScreen } from '@/screens/home/GameScreen';
import { SearchScreen } from '@/screens/home/SearchScreen';

import { useAuth } from '@/hooks/useAuth';
import { GameEditorScreen } from '@/screens/admin/games/GameEditorScreen';
import { GenreEditorScreen } from '@/screens/admin/genres/GenreEditorScreen';
import { EditProfileScreen } from '@/screens/profile/EditProfileScreen';
import { EditUserAddressScreen } from '@/screens/profile/EditUserAddressScreen';
import { type AppRoutesType } from '../interfaces';

const Stack = createNativeStackNavigator<AppRoutesType>();

export const StackRoutes = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAdminAuthenticated, setIsAdimAuthenticated] = useState<boolean>(true);
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          freezeOnBlur: true,
          headerShown: false,
        }}
      />

      <Stack.Screen name="Cart" component={CartScreen} />

      <Stack.Screen name="Game" component={GameScreen} />

      {user?.isAdmin ? (
        <>
          <Stack.Screen
            name="GameEditor"
            component={GameEditorScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="GenreEditor" component={GenreEditorScreen} />
        </>
      ) : (
        <></>
      )}

      <Stack.Screen name="EditProfile" component={EditProfileScreen} />

      <Stack.Screen name="EditUserAddress" component={EditUserAddressScreen} />
    </Stack.Navigator>
  );
};
