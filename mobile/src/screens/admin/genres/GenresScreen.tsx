import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, ToastAndroid, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardGenreAndUserRectangle } from '@/components/Card/CardGenreAndUserRectangle';
import { ListEmpty } from '@/components/ListEmpty';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { ModalPopupConfirm } from '@/components/Modal/ModalPopupConfirm';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { type MainNavigatorRoutesProps } from '@/types/routes';

export const GenresScreen = () => {
  const [modalConfirmVisible, setConfirmModalVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [idToRemove, setIdToRemove] = useState('');
  const [genres, setGenres] = useState<IGenre[]>([]);

  const navigation = useNavigation<MainNavigatorRoutesProps>();

  const { removeUserAndToken } = useAuth();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getGenres();
    });
  }, [navigation]);

  const getGenres = async () => {
    setModalLoadingVisible(true);

    try {
      const request = await api.get('/genres');

      setGenres(request.data.genres);
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
    getGenres();
    setRefreshing(false);
  };

  const removeGenre = async (id: string) => {
    if (idToRemove) {
      setModalLoadingVisible(true);

      try {
        await api.delete(`/genres/${id}`);
        setModalLoadingVisible(false);

        ToastAndroid.show('Gênero removido com sucesso', 300);
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
            case 409:
              ToastAndroid.show(
                'Este gênero não pode ser deletado pois faz parte de um jogo cadastrado',
                600,
              );
              break;
            default:
              Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
              break;
          }
        }
      }

      getGenres();
      setIdToRemove('');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8.5 }}>
      <FlatList
        data={genres}
        refreshing={refreshing}
        onRefresh={handleSetRefreshing}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 10 }}
        renderItem={({ item }) => (
          <CardGenreAndUserRectangle
            genre={item}
            toEdit={() => navigation.navigate('GenreEditor', { id: item.id })}
            toRemove={() => {
              setConfirmModalVisible(true);
              setIdToRemove(item.id);
            }}
          />
        )}
        ListEmptyComponent={() => <ListEmpty text={'Nenhum gênero cadastrado'} />}
      />

      {modalLoadingVisible ? <ModalLoading /> : <></>}

      <ModalPopupConfirm
        visible={modalConfirmVisible}
        setVisible={setConfirmModalVisible}
        iconName={'warning'}
        title={'Você realmente deseja deletar este gênero?'}
        isTrue={() => removeGenre(idToRemove)}
      />

      <View
        style={{
          alignSelf: 'stretch',
          marginVertical: 15,
          marginHorizontal: 20,
        }}
      >
        <Button
          text={'Cadastrar gênero'}
          onClick={() => navigation.navigate('GenreEditor')}
        />
      </View>
    </SafeAreaView>
  );
};
