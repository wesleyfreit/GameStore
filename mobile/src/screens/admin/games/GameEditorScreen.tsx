import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import React, { Alert, ScrollView, ToastAndroid } from 'react-native';

import { Button } from '@/components/Button';
import { CheckBox } from '@/components/CheckBox';
import { ScreenHeader } from '@/components/Header/ScreenHeader';
import { Input } from '@/components/Input';
import { InsertImage } from '@/components/InsertImage';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { SafeAreaDefault } from '@/components/SafeAreaDefault';
import { Select } from '@/components/Select';
import { Texterea } from '@/components/Texterea';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewDefault } from '@/components/ViewDefault';

import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { createAndEditGameSchema } from '@/schemas/createAndEditGameSchema';
import { type MainNavigatorRoutesProps } from '@/types/routes';
import { URL_API } from '@env';

export const GameEditorScreen = () => {
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>('');
  const [disponible, setDisponible] = useState(false);
  const [id, setId] = useState<string | undefined>();
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [error, setError] = useState('');

  const navigation = useNavigation<MainNavigatorRoutesProps>();
  const route = useRoute();

  const { removeUserAndToken } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(createAndEditGameSchema(preview, genre, imageUrl)),
  });

  useEffect(() => {
    if (route.params && 'slug' in route.params) {
      handleSetProperties(route.params.slug as string);
    }

    getGenres();
  }, [navigation]);

  const handleSetProperties = async (slug: string) => {
    setModalLoadingVisible(true);

    try {
      const request = await api.get(`/games/${slug}`);
      const data: IGame = request.data.game;
      if (data) {
        setValue('title', data.title);
        setValue('year', data.year);
        setValue('price', data.price);
        setValue('description', data.description);
        setValue('disponibility', data.disponibility);
        setValue('genre', data.genreId);

        setId(data.id);
        setGenre(data.genreId);
        setDisponible(data.disponibility);
        setImageUrl(URL_API.concat(data.imageUrl));
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

  const handleCreateGame = async (data: IGameCreateAndEdit) => {
    setModalLoadingVisible(true);

    const formData = new FormData();

    formData.append('image', {
      uri: preview,
      name: 'image.jpg',
      type: 'image/jpeg',
    } as unknown);

    formData.append('title', data.title);
    formData.append('year', data.year);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('genre', data.genre);
    formData.append('disponibility', data.disponibility);

    try {
      await api.post('/games', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setModalLoadingVisible(false);

      ToastAndroid.show('Jogo criado com sucesso', 300);

      navigation.goBack();
    } catch (error) {
      setModalLoadingVisible(false);

      if (isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK')
          ToastAndroid.show('Ocorreu um erro de conexão, tente novamente.', 400);
        else {
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
    }
  };

  const handleEditGame = async (data: IGameCreateAndEdit) => {
    setModalLoadingVisible(true);

    const formData = new FormData();

    if (preview) {
      formData.append('image', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as unknown);
    }
    
    formData.append('title', data.title);
    formData.append('year', data.year);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('genre', data.genre);
    formData.append('disponibility', data.disponibility);

    try {
      await api.put(`/games/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setModalLoadingVisible(false);

      ToastAndroid.show('Jogo atualizado com sucesso', 300);

      navigation.goBack();
    } catch (error) {
      setModalLoadingVisible(false);

      if (isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK')
          ToastAndroid.show('Ocorreu um erro de conexão, tente novamente.', 400);
        else {
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
    }
  };

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

  return (
    <SafeAreaDefault>
      <ScreenHeader
        title={id ? 'Editar jogo' : 'Cadastrar jogo'}
        toBack={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, gap: 15, paddingVertical: 15 }}
        showsVerticalScrollIndicator={false}
      >
        <ViewDefault>
          <TitleGuide text={id ? 'Editar jogo' : 'Novo jogo'} />

          <InsertImage
            control={control}
            errors={errors}
            setPreview={setPreview}
            preview={preview}
            imageUrl={imageUrl}
          />

          <Input
            name={'title'}
            text={'Inserir título do jogo'}
            control={control}
            errors={errors}
            error={
              error === 'Title already registered'
                ? 'Este título já está registrado.'
                : undefined
            }
            changeMessage={setError}
          />

          <Input
            name={'year'}
            text={'Inserir ano de lançamento'}
            type={'numeric'}
            control={control}
            errors={errors}
          />

          <Input
            name={'price'}
            text={'Inserir preço de venda'}
            type={'numeric'}
            control={control}
            errors={errors}
          />

          <Texterea
            name={'description'}
            text={'Inserir descrição do jogo'}
            control={control}
            errors={errors}
            height={100}
          />

          <Select
            control={control}
            errors={errors}
            array={genres}
            item={genre}
            setItem={setGenre}
          />

          <CheckBox
            disponible={disponible}
            setDisponible={setDisponible}
            control={control}
          />

          {modalLoadingVisible ? <ModalLoading /> : <></>}

          <Button
            text={!id ? 'Criar jogo' : 'Salvar edição'}
            onClick={handleSubmit(!id ? handleCreateGame : handleEditGame)}
          />
        </ViewDefault>
      </ScrollView>
    </SafeAreaDefault>
  );
};
