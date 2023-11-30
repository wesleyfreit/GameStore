import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';

import { GameEditorScreen } from '@/screens/admin/games/GameEditorScreen';
import { GamesScreen } from '@/screens/admin/games/GamesScreen';
import { GenreEditorScreen } from '@/screens/admin/genres/GenreEditorScreen';
import { GenresScreen } from '@/screens/admin/genres/GenresScreen';
import { UsersScreen } from '@/screens/admin/users/UsersScreen';
import { CartScreen } from '@/screens/home/CartScreen';
import { GameScreen } from '@/screens/home/GameScreen';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { SearchScreen } from '@/screens/home/SearchScreen';
import { EditProfileScreen } from '@/screens/profile/EditProfileScreen';
import { EditUserAddressScreen } from '@/screens/profile/EditUserAddressScreen';
import { ProfileScreen } from '@/screens/profile/ProfileScreen';

import DefaultAvatar from '@/assets/svgs/avatar-default-icon.png';
import { Icon } from '@/components/Icon';
import { Image } from 'react-native';
import { AppRoutesType } from './interfaces';
import { tabBarIconStyle } from './styles';

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesType>();

export const AppRoutes = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAdminAuthenticated, setIsAdimAuthenticated] = useState<boolean>(true);

  return (
    <Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: { height: 70, paddingBottom: 10 },
      }}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShadowVisible: false,
          title: 'Início',
          freezeOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon iconName="home" size={30} color={color} />,
        }}
      />

      {isAdminAuthenticated ? (
        <>
          <Screen
            name="Games"
            component={GamesScreen}
            options={{
              title: 'Jogos',
              tabBarIcon: ({ color }) => (
                <Icon iconName="games" size={30} color={color} />
              ),
            }}
          />

          <Screen
            name="Genres"
            component={GenresScreen}
            options={{
              title: 'Gêneros',
              tabBarIcon: ({ color }) => (
                <Icon iconName="genres" size={30} color={color} />
              ),
            }}
          />

          <Screen
            name="Users"
            component={UsersScreen}
            options={{
              title: 'Usuários',
              tabBarIcon: ({ color }) => (
                <Icon iconName="users" size={30} color={color} />
              ),
            }}
          />

          <Screen
            name="GameEditor"
            component={GameEditorScreen}
            options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
          />

          <Screen
            name="GenreEditor"
            component={GenreEditorScreen}
            options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
          />
        </>
      ) : (
        <></>
      )}

      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Image
              source={DefaultAvatar}
              style={{ ...tabBarIconStyle, borderColor: color }}
            />
          ),
        }}
      />

      <Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />

      <Screen
        name="Cart"
        component={CartScreen}
        options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />

      <Screen
        name="Game"
        component={GameScreen}
        options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />

      <Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />

      <Screen
        name="EditUserAddress"
        component={EditUserAddressScreen}
        options={{ tabBarButton: () => null, tabBarStyle: { display: 'none' } }}
      />
    </Navigator>
  );
};
