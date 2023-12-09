import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ToastAndroid } from 'react-native';

import { CardGameDefault } from '@/components/Card/CardGameDefault';
import { HomeHeader } from '@/components/Header/HomeHeader';
import { ListEmpty } from '@/components/ListEmpty';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { SafeAreaDefault } from '@/components/SafeAreaDefault';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { storageCartTokenGet, storageCartTokenSave } from '@/storage/storageCartToken';
import { type MainNavigatorRoutesProps } from '@/types/routes';
import { AppError } from '@/utils/AppError';

export const HomeScreen = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [cartLength, setCartLength] = useState(0);

  const navigation = useNavigation<MainNavigatorRoutesProps>();
  const { removeUserAndToken } = useAuth();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getGames();
      getCartLength();
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
        const status = error.response?.status;
        switch (status) {
          case 400:
            if (message.error === 'Not Authorized')
              ToastAndroid.show('A sessão atual é inválida', 300);
            if (message.error == 'Invalid Session')
              ToastAndroid.show('A sessão atual expirou', 300);

            removeUserAndToken();
            break;
          default:
            Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
            break;
        }
      }
    }
  };

  const getCartLength = async () => {
    setModalLoadingVisible(true);
    try {
      const cartToken = await storageCartTokenGet();

      if (cartToken) api.defaults.headers.common['cart_items'] = cartToken;

      const { data } = await api.get('/cart');

      if (data.cartItems) {
        setCartLength(data.cartItems.length);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      if (isAppError) {
        Alert.alert(error.message);
      }
      if (isAxiosError(error)) {
        const message = error.response?.data;
        const status = error.response?.status;

        switch (status) {
          case 400:
            if (message.error === 'Not Authorized')
              ToastAndroid.show('A sessão atual é inválida', 300);
            if (message.error == 'Invalid Session')
              ToastAndroid.show('A sessão atual expirou', 300);

            removeUserAndToken();
            break;
          default:
            Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
            break;
        }
      }
    } finally {
      setModalLoadingVisible(false);
    }
  };

  const handleSetRefreshing = () => {
    setRefreshing(true);
    getGames();
    setRefreshing(false);
  };

  const addToCart = async (id: string) => {
    setModalLoadingVisible(true);
    try {
      const cartToken = await storageCartTokenGet();

      if (cartToken) api.defaults.headers.common['cart_items'] = cartToken;

      const { data } = await api.put(`/cart/${id}`);

      await storageCartTokenSave(data.cart_items);

      getCartLength();

      ToastAndroid.show('Item adicionado ao carrinho', 300);
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data;
        const status = error.response?.status;
        switch (status) {
          case 400:
            if (message.error === 'Not Authorized')
              ToastAndroid.show('A sessão atual é inválida', 300);
            if (message.error == 'Invalid Session')
              ToastAndroid.show('A sessão atual expirou', 300);

            removeUserAndToken();
            break;
          case 401:
            if (message.error === 'Item is already on the cart')
              ToastAndroid.show('Item já está no carrinho', 300);
            break;
          default:
            Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
            break;
        }
      }
    } finally {
      setModalLoadingVisible(false);
    }
  };

  return (
    <SafeAreaDefault>
      <HomeHeader
        toSearch={() => navigation.navigate('Search')}
        toCart={() => navigation.navigate('Cart')}
        cartLength={cartLength}
      />

      {modalLoadingVisible ? <ModalLoading /> : <></>}

      <FlatList
        data={games}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        refreshing={refreshing}
        onRefresh={handleSetRefreshing}
        columnWrapperStyle={{
          gap: 8,
        }}
        contentContainerStyle={{
          gap: 8,
          paddingVertical: 10,
        }}
        renderItem={({ item }) => (
          <CardGameDefault
            game={item}
            toGame={() => navigation.navigate('Game', { slug: item.slug })}
            addToCart={() => addToCart(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty text={'Não existe nenhum jogo para exibir'} />
        )}
      />
    </SafeAreaDefault>
  );
};
