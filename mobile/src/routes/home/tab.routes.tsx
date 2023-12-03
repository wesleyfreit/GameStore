import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';

import { GamesScreen } from '@/screens/admin/games/GamesScreen';
import { GenresScreen } from '@/screens/admin/genres/GenresScreen';
import { UsersScreen } from '@/screens/admin/users/UsersScreen';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { ProfileScreen } from '@/screens/profile/ProfileScreen';

import { Icon } from '@/components/Icon';
import { useAuth } from '@/hooks/useAuth';
import { URL_API } from '@env';
import { type AppRoutesType } from '../interfaces';
import { tabBarIconStyle } from '../styles';

const Tab = createBottomTabNavigator<AppRoutesType>();

export const TabRoutes = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: { height: 70, paddingBottom: 10 },
      }}
    >
      <Tab.Screen
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

      {user?.isAdmin ? (
        <>
          <Tab.Screen
            name="Games"
            component={GamesScreen}
            options={{
              title: 'Jogos',
              tabBarIcon: ({ color }) => (
                <Icon iconName="games" size={30} color={color} />
              ),
            }}
          />

          <Tab.Screen
            name="Genres"
            component={GenresScreen}
            options={{
              title: 'Gêneros',
              tabBarIcon: ({ color }) => (
                <Icon iconName="genres" size={30} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Users"
            component={UsersScreen}
            options={{
              title: 'Usuários',
              tabBarIcon: ({ color }) => (
                <Icon iconName="users" size={30} color={color} />
              ),
            }}
          />
        </>
      ) : (
        <></>
      )}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Image
              source={{ uri: URL_API.concat(user?.avatar as string) }}
              style={{ ...tabBarIconStyle, borderColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
