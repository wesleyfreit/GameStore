import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { GameEditorScreen } from '@/screens/admin/games/GameEditorScreen';
import { GenreEditorScreen } from '@/screens/admin/genres/GenreEditorScreen';
import { CartScreen } from '@/screens/home/CartScreen';
import { GameScreen } from '@/screens/home/GameScreen';
import { SearchScreen } from '@/screens/home/SearchScreen';
import { EditProfileScreen } from '@/screens/profile/EditProfileScreen';

import { Icon } from '@/components/Icon';
import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/styles/global';
import { type MainNavigatorRoutesProps, type MainRoutesType } from '@/types/routes';
import { MenuRoutes } from './menu.routes';

const { Navigator, Screen } = createNativeStackNavigator<MainRoutesType>();

export const MainRoutes = () => {
  const { user } = useAuth();

  const navigation = useNavigation<MainNavigatorRoutesProps>();

  return (
    <Navigator>
      <Screen
        name="Menu"
        component={MenuRoutes}
        options={{
          freezeOnBlur: true,
          headerShown: false,
        }}
      />

      <Screen
        name="Search"
        component={SearchScreen}
        options={{
          freezeOnBlur: true,
          headerShown: false,
        }}
      />

      <Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShadowVisible: false, title: 'Meu Carrinho' }}
      />

      <Screen
        name="Game"
        component={GameScreen}
        options={{ headerShadowVisible: false, headerTitle: '' }}
      />

      {user?.isAdmin ? (
        <>
          <Screen
            name="GameEditor"
            component={GameEditorScreen}
            options={{
              headerShown: false,
            }}
          />
          <Screen
            name="GenreEditor"
            component={GenreEditorScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <></>
      )}

      <Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          title: 'Editar perfil',
          animation: 'slide_from_bottom',
          animationDuration: 300,
          headerBackVisible: false,
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
              <Icon iconName="close" color={colors.text.color} size={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  );
};
