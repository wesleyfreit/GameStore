import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { GamesScreen } from '@/screens/admin/games/GamesScreen';
import { GenresScreen } from '@/screens/admin/genres/GenresScreen';
import { UsersScreen } from '@/screens/admin/users/UsersScreen';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { ProfileScreen } from '@/screens/profile/ProfileScreen';

import { Icon } from '@/components/Icon';
import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/styles/global';
import { URL_API } from '@env';
import { type MainNavigatorRoutesProps, type MainRoutesType } from '../types/routes';

const { Navigator, Screen } = createBottomTabNavigator<MainRoutesType>();

export const MenuRoutes = () => {
  const { user } = useAuth();

  const navigation = useNavigation<MainNavigatorRoutesProps>();

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

      {user?.isAdmin ? (
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
        </>
      ) : (
        <></>
      )}

      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Image
              source={{ uri: URL_API.concat(user?.avatar as string) }}
              style={{
                width: 30,
                height: 30,
                borderWidth: 2,
                borderRadius: 30,
                borderColor: color,
              }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Icon iconName="pencil" color={colors.text.color} size={24} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: { paddingHorizontal: 15 },
        }}
      />
    </Navigator>
  );
};
