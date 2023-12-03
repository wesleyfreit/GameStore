import { api } from '@/lib/api';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';

import { CardGameDefault } from '@/components/Card/CardGameDefault';
import { HomeHeader } from '@/components/Header/HomeHeader';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { type AppFunctionProps } from '@/types/app';

export const HomeScreen = ({ navigation }: AppFunctionProps) => {
  const [games, setGames] = useState<IGame[]>([]);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getGames();
    });
  }, [navigation]);

  const getGames = async () => {
    setModalLoadingVisible(true);

    try {
      const request = await api.get('/index');

      setGames(request.data.games);
      setModalLoadingVisible(false);
    } catch (error) {
      setModalLoadingVisible(false);

      if (isAxiosError(error)) {
        const message = error.response?.data;
        Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message}`);
      }
    }
  };

  const handleSetRefreshing = () => {
    setRefreshing(true);
    getGames();
    setRefreshing(false);
  };

  const addToCart = (id: string) => {
    console.log(id);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', marginTop: 15 }}>
      <HomeHeader
        toSearch={() => navigation.navigate('Stack', { screen: 'Search' })}
        toCart={() => navigation.navigate('Stack', { screen: 'Cart' })}
      />

      {modalLoadingVisible ? <ModalLoading /> : <></>}

      <FlatList
        data={games}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        refreshing={refreshing}
        onRefresh={handleSetRefreshing}
        columnWrapperStyle={{ gap: 8 }}
        contentContainerStyle={{ gap: 8, paddingVertical: 10 }}
        renderItem={({ item }) => (
          <CardGameDefault
            game={item}
            toGame={() =>
              navigation.navigate('Stack', { screen: 'Game', params: { id: item.id } })
            }
            addToCart={() => addToCart(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};
