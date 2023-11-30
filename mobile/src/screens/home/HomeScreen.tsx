import { api } from '@/lib/axios';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';

import { Card } from '@/components/Card';
import { HomeHeader } from '@/components/HomeHeader';
import { type AppFunctionProps } from '@/types/app';

export const HomeScreen = ({ navigation }: AppFunctionProps) => {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const request = await api.get('/index');
        setGames(request.data.games);
      } catch (error) {
        if (isAxiosError(error)) {
          const message = error.response?.data;
          Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message}`);
        }
      }
    })();
  }, []);

  const navigateToSearch = () => navigation.navigate('Search');
  const navigateToCart = () => navigation.navigate('Cart');
  const navigateToGame = (id: string) => navigation.navigate('Game', { id });

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', marginTop: 15 }}>
      <HomeHeader toSearch={navigateToSearch} toCart={navigateToCart} />
      <FlatList
        data={games}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ gap: 8 }}
        contentContainerStyle={{ gap: 8 }}
        renderItem={({ item }) => <Card game={item} toGame={navigateToGame} />}
      />
    </SafeAreaView>
  );
};
