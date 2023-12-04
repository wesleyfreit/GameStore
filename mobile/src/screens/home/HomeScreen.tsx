import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView } from 'react-native';

import { CardGameDefault } from '@/components/Card/CardGameDefault';
import { HomeHeader } from '@/components/Header/HomeHeader';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { api } from '@/lib/api';
import { type MainNavigatorRoutesProps } from '@/types/routes';

export const HomeScreen = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation<MainNavigatorRoutesProps>();

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
        toSearch={() => navigation.navigate('Search')}
        toCart={() => navigation.navigate('Cart')}
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
            toGame={() => navigation.navigate('Game', { id: item.id })}
            addToCart={() => addToCart(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};
