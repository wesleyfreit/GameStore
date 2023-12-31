import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ToastAndroid } from 'react-native';

import { Button } from '@/components/Button';
import { CardGameRectangle } from '@/components/Card/CardGameRetangle';
import { ListEmpty } from '@/components/ListEmpty';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { ModalPopupConfirm } from '@/components/Modal/ModalPopupConfirm';
import { SafeAreaDefault } from '@/components/SafeAreaDefault';

import { ViewDefault } from '@/components/ViewDefault';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { type MainNavigatorRoutesProps } from '@/types/routes';

export const GamesScreen = () => {
  const [modalConfirmVisible, setConfirmModalVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [idToRemove, setIdToRemove] = useState('');
  const [games, setGames] = useState<IGame[]>([]);
  const [userGames, setUserGames] = useState<IUserGame[]>([]);

  const navigation = useNavigation<MainNavigatorRoutesProps>();

  const { user, removeUserAndToken } = useAuth();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getGames();
      getUserGames();
    });
  }, [navigation]);

  const getGames = async () => {
    setModalLoadingVisible(true);

    try {
      const request = await api.get('/games');
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

  const handleSetRefreshing = () => {
    setRefreshing(true);
    getGames();
    setRefreshing(false);
  };

  const removeGame = async (id: string) => {
    if (idToRemove) {
      setModalLoadingVisible(true);

      try {
        await api.delete(`/games/${id}`);
        setModalLoadingVisible(false);

        ToastAndroid.show('Jogo removido com sucesso', 300);
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
            case 401:
              if (message.error === 'Game bought by an user')
                ToastAndroid.show(
                  'O jogo não pode ser deletado porquê ele já foi comprado por algum usuário',
                  300,
                );
              break;
            default:
              Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
              break;
          }
        }
      }

      getGames();
      setIdToRemove('');
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
    <SafeAreaDefault>
      <FlatList
        data={games}
        refreshing={refreshing}
        onRefresh={handleSetRefreshing}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 10 }}
        renderItem={({ item }) => (
          <CardGameRectangle
            game={item}
            toGame={() =>
              navigation.navigate('Game', {
                slug: item.slug,
                bought: checkBought(item.id),
              })
            }
            toEdit={() => navigation.navigate('GameEditor', { slug: item.slug })}
            toRemove={() => {
              setConfirmModalVisible(true);
              setIdToRemove(item.id);
            }}
          />
        )}
        ListEmptyComponent={() => <ListEmpty text={'Nenhum jogo cadastrado'} />}
      />

      {modalLoadingVisible ? <ModalLoading /> : <></>}

      <ModalPopupConfirm
        visible={modalConfirmVisible}
        setVisible={setConfirmModalVisible}
        iconName={'warning'}
        title={'Você realmente deseja deletar este jogo?'}
        isTrue={() => removeGame(idToRemove)}
      />

      <ViewDefault>
        <Button
          text={'Cadastrar jogo'}
          onClick={() => navigation.navigate('GameEditor')}
        />
      </ViewDefault>
    </SafeAreaDefault>
  );
};
