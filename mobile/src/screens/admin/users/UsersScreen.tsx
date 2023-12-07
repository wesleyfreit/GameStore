import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ToastAndroid } from 'react-native';

import { CardGenreAndUserRectangle } from '@/components/Card/CardGenreAndUserRectangle';
import { ListEmpty } from '@/components/ListEmpty';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { ModalPopupConfirm } from '@/components/Modal/ModalPopupConfirm';
import { SafeAreaDefault } from '@/components/SafeAreaDefault';

import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { type MainNavigatorRoutesProps } from '@/types/routes';

export const UsersScreen = () => {
  const [modalConfirmVisible, setConfirmModalVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [idToChange, setIdToChange] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const navigation = useNavigation<MainNavigatorRoutesProps>();

  const { removeUserAndToken } = useAuth();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getUsers();
    });
  }, [navigation]);

  const getUsers = async () => {
    setModalLoadingVisible(true);

    try {
      const request = await api.get('/users');

      setUsers(request.data.users);
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
    getUsers();
    setRefreshing(false);
  };

  const changeUserPermission = async (id: string) => {
    setModalLoadingVisible(true);

    try {
      const response = await api.patch(`/users/${id}`);
      setModalLoadingVisible(false);
      const user = response.data.user;

      if (user.isAdmin)
        ToastAndroid.show(`O ${user.username} agora é um usuário administrador`, 300);
      else ToastAndroid.show(`O ${user.username} agora é um usuário normal`, 300);
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
            ToastAndroid.show('Você não pode alterar a sua própria permissão', 300);
            break;
          default:
            Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
            break;
        }
      }
    }

    getUsers();
  };

  return (
    <SafeAreaDefault>
      <FlatList
        data={users}
        refreshing={refreshing}
        onRefresh={handleSetRefreshing}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 10 }}
        renderItem={({ item }) => (
          <CardGenreAndUserRectangle
            user={item}
            toEdit={() => {
              setIdToChange(item.id);
              setConfirmModalVisible(true);
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
        title={'Você realmente deseja alterar a permissão deste usuário?'}
        isTrue={() => changeUserPermission(idToChange)}
      />
    </SafeAreaDefault>
  );
};
