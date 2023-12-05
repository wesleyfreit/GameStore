import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import React, { Alert, SafeAreaView, ScrollView, ToastAndroid, View } from 'react-native';

import { Button } from '@/components/Button';
import { ScreenHeader } from '@/components/Header/ScreenHeader';
import { Input } from '@/components/Input';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewDefault } from '@/components/ViewDefault';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { createAndEditGenreSchema } from '@/schemas/createAndEditGenreSchema';
import { type MainNavigatorRoutesProps } from '@/types/routes';

export const GenreEditorScreen = () => {
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [id, setId] = useState<string | undefined>();
  const [error, setError] = useState('');

  const navigation = useNavigation<MainNavigatorRoutesProps>();
  const route = useRoute();

  const { removeUserAndToken } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(createAndEditGenreSchema) });

  useEffect(() => {
    if (route.params && 'id' in route.params) {
      handleSetProperties(route.params.id as string);
    }
  }, [navigation]);

  const handleSetProperties = async (id: string) => {
    setModalLoadingVisible(true);

    try {
      const request = await api.get(`/genres/${id}`);
      const data: IGenre = request.data.genre;
      if (data) {
        setValue('name', data.name);

        setId(data.id);
      }
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

  const handleCreateGenre = async (data: IGenreCreateAndEdit) => {
    setModalLoadingVisible(true);

    try {
      await api.post('/genres', { name: data.name });

      setModalLoadingVisible(false);

      ToastAndroid.show('Gênero criado com sucesso', 300);

      navigation.goBack();
    } catch (error) {
      setModalLoadingVisible(false);

      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data;
        switch (status) {
          case 400:
            if (message.error === 'Not Authorized')
              ToastAndroid.show('A sessão atual é inválida', 300);
            if (message.error == 'Invalid Session')
              ToastAndroid.show('A sessão atual expirou', 300);

            removeUserAndToken();
            break;
          case 409:
            setError(message.error);
            break;
          default:
            Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
            break;
        }
      }
    }
  };
  const handleEditGenre = async (data: IGenreCreateAndEdit) => {
    setModalLoadingVisible(true);

    try {
      await api.put(`/genres/${id}`, { name: data.name }, {});

      setModalLoadingVisible(false);

      ToastAndroid.show('Gênero atualizado com sucesso', 300);

      navigation.goBack();
    } catch (error) {
      setModalLoadingVisible(false);

      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data;
        switch (status) {
          case 400:
            if (message.error === 'Not Authorized')
              ToastAndroid.show('A sessão atual é inválida', 300);
            if (message.error == 'Invalid Session')
              ToastAndroid.show('A sessão atual expirou', 300);

            removeUserAndToken();
            break;
          case 409:
            setError(message.error);
            break;
          default:
            Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
            break;
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8.5 }}>
      <ScreenHeader
        title={id ? 'Editar gênero' : 'Cadastrar gênero'}
        toBack={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, gap: 15, marginVertical: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <ViewDefault>
          <View
            style={{
              display: 'flex',
              alignSelf: 'stretch',
            }}
          >
            <TitleGuide text={id ? 'Editar gênero' : 'Novo gênero'} />
          </View>

          <Input
            name={'name'}
            text={'Inserir nome do gênero'}
            control={control}
            errors={errors}
            error={
              error === 'Genre already registered'
                ? 'Este gênero já está registrado.'
                : undefined
            }
            changeMessage={setError}
          />

          {modalLoadingVisible ? <ModalLoading /> : <></>}

          <Button
            text={!id ? 'Criar gênero' : 'Salvar edição'}
            onClick={handleSubmit(!id ? handleCreateGenre : handleEditGenre)}
          />
        </ViewDefault>
      </ScrollView>
    </SafeAreaView>
  );
};
