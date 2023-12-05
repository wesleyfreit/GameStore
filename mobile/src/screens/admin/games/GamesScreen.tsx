import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, ToastAndroid, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardGameRectangle } from '@/components/Card/CardGameRetangle';
import { ListEmpty } from '@/components/ListEmpty';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { ModalPopupConfirm } from '@/components/Modal/ModalPopupConfirm';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { type MainNavigatorRoutesProps } from '@/types/routes';

export const GamesScreen = () => {
  const [modalConfirmVisible, setConfirmModalVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [idToRemove, setIdToRemove] = useState('');
  const [games, setGames] = useState<IGame[]>([]);

  const navigation = useNavigation<MainNavigatorRoutesProps>();

  const { removeUserAndToken } = useAuth();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getGames();
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

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8.5 }}>
      <FlatList
        data={games}
        refreshing={refreshing}
        onRefresh={handleSetRefreshing}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 10 }}
        renderItem={({ item }) => (
          <CardGameRectangle
            game={item}
            toGame={() => navigation.navigate('Game', { id: item.id })}
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
        iconName={'danger'}
        title={'Você realmente deseja deletar este jogo?'}
        isTrue={() => removeGame(idToRemove)}
      />

      <View
        style={{
          alignSelf: 'stretch',
          marginVertical: 15,
          marginHorizontal: 20,
        }}
      >
        <Button
          text={'Cadastrar jogo'}
          onClick={() => navigation.navigate('GameEditor')}
        />
      </View>
    </SafeAreaView>
  );
};
