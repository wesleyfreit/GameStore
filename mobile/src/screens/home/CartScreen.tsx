import { api } from '@/lib/api';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, ToastAndroid, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardGameRectangle } from '@/components/Card/CardGameRetangle';
import { ModalPopupConfirm } from '@/components/Modal/ModalPopupConfirm';
import { colors } from '@/styles/global';
import { useNavigation } from '@react-navigation/native';
import { HomeNavigatorRoutesProps } from '@/routes/interfaces';

export const CartScreen = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [modalConfirmVisible, setConfirmModalVisible] = useState(false);
  const [idToRemove, setIdToRemove] = useState('');

  const navigation = useNavigation<HomeNavigatorRoutesProps>();

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    try {
      const request = await api.get('/games');
      setGames(request.data.games);
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data;
        Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message}`);
      }
    }
  };

  const editGame = (id: string) => {
    navigation.navigate('GameEditor', { id });
  };

  const removeGame = async (id: string) => {
    if (idToRemove) {
      try {
        await api.delete(`/games/${id}`);
      } catch (error) {
        if (isAxiosError(error)) {
          const message = error.response?.data;
          Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message}`);
        }
      }
      ToastAndroid.show('Jogo removido com sucesso', 300);
      getGames();
      setIdToRemove('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8.5 }}>
      <FlatList
        data={games}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 10 }}
        renderItem={({ item }) => (
          <CardGameRectangle
            game={item}
            toGame={() => navigation.navigate('Game', { id: item.id })}
            toEdit={() => editGame(item.id)}
            toRemove={() => {
              setConfirmModalVisible(true);
              setIdToRemove(item.id);
            }}
          />
        )}
      />

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
          justifyContent: 'flex-end',
          marginHorizontal: 15,
          marginBottom: 50,
          paddingVertical: 15,
          flex: 1,
          backgroundColor: colors.theme.color,
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
