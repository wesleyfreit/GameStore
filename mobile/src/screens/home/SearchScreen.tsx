import { CardGameDefault } from '@/components/Card/CardGameDefault';
import { SearchHeader } from '@/components/Header/SearchHeader';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { SafeAreaDefault } from '@/components/SafeAreaDefault';
import { TitleSub } from '@/components/Title/TitleSub/TitleSub';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { storageCartTokenGet, storageCartTokenSave } from '@/storage/storageCartToken';
import { type MainNavigatorRoutesProps } from '@/types/routes';
import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ToastAndroid } from 'react-native';

export const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<IGame[]>([]);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [userGames, setUserGames] = useState<IUserGame[]>([]);

  const navigation = useNavigation<MainNavigatorRoutesProps>();

  const { user, removeUserAndToken } = useAuth();

  useEffect(() => {
    getUserGames();
  }, [navigation]);

  const handleSearch = async () => {
    if (searchValue === '') ToastAndroid.show('Não há nada na barra de buscar', 300);
    else {
      setModalLoadingVisible(true);

      try {
        const request = await api.get(`/games/search?name=${searchValue}`);

        setResults(request.data.games);
        setModalLoadingVisible(false);
      } catch (error) {
        setModalLoadingVisible(false);

        if (isAxiosError(error)) {
          const message = error.response?.data;
          const status = error.response?.status;
          switch (status) {
            case 400:
              if (message.error === 'Not Authorized') {
                removeUserAndToken();
                ToastAndroid.show('A sessão atual é inválida', 300);
              }
              if (message.error == 'Invalid Session') {
                ToastAndroid.show('A sessão atual expirou', 300);
                removeUserAndToken();
              }
              break;
            default:
              Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
              break;
          }
        }
      }
    }
  };

  const addToCart = async (id: string) => {
    setModalLoadingVisible(true);
    try {
      const cartToken = await storageCartTokenGet();

      if (cartToken) api.defaults.headers.common['cart_items'] = cartToken;

      const { data } = await api.put(`/cart/${id}`);

      await storageCartTokenSave(data.cart_items);

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

  const getUserGames = async () => {
    setModalLoadingVisible(true);

    try {
      const request = await api.get(`/users/account/${user?.username}`);

      setUserGames(request.data.userGames);
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

  const checkBought = (id: string): boolean => {
    return userGames.some((userGame) => userGame.game.id === id);
  };

  return (
    <SafeAreaDefault paddingVertical={4} paddingBottom={0}>
      <SearchHeader
        toBack={() => navigation.goBack()}
        toSearch={handleSearch}
        value={searchValue}
        setValue={setSearchValue}
      />
      {results.length > 0 && <TitleSub value={`Resultados para "${searchValue}".`} />}

      {modalLoadingVisible ? <ModalLoading /> : <></>}

      <FlatList
        data={results}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ gap: 8 }}
        contentContainerStyle={{ gap: 8, paddingVertical: 10 }}
        renderItem={({ item }) => (
          <CardGameDefault
            game={item}
            toGame={() =>
              navigation.navigate('Game', {
                slug: item.slug,
                bought: checkBought(item.id),
              })
            }
            addToCart={() => addToCart(item.id)}
            disponible={item.disponibility}
            bought={checkBought(item.id)}
            bgColor={
              checkBought(item.id) ? 'success' : item.disponibility ? '' : 'disable'
            }
          />
        )}
      />
    </SafeAreaDefault>
  );
};
