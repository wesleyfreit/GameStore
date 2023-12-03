import { api } from '@/lib/api';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, Text, ToastAndroid, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardGameRectangle } from '@/components/Card/CardGameRetangle';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { ModalPopupConfirm } from '@/components/Modal/ModalPopupConfirm';
import { colors } from '@/styles/global';
import { AppFunctionProps } from '@/types/app';

export const GamesScreen = ({ navigation }: AppFunctionProps) => {
  const [modalConfirmVisible, setConfirmModalVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [idToRemove, setIdToRemove] = useState('');
  const [games, setGames] = useState<IGame[]>([]);

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
        Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message}`);
      }
    }
  };

  const handleSetRefreshing = () => {
    setRefreshing(true);
    getGames();
    setRefreshing(false);
  };

  const editGame = (slug: string) => {
    navigation.navigate('Stack', { screen: 'GameEditor', params: { slug } });
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
          Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message}`);
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
            toGame={() =>
              navigation.navigate('Stack', { screen: 'Game', params: { id: item.id } })
            }
            toEdit={() => editGame(item.slug)}
            toRemove={() => {
              setConfirmModalVisible(true);
              setIdToRemove(item.id);
            }}
          />
        )}
        ListEmptyComponent={() => (
          <View>
            <Text style={{ color: colors.text.color }}>Nenhum jogo cadastrado</Text>
          </View>
        )}
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
          onClick={() => navigation.navigate('Stack', { screen: 'GameEditor' })}
        />
      </View>
    </SafeAreaView>
  );
};
