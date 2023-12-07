import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ToastAndroid, TouchableOpacity, View } from 'react-native';

import { CardGameDefault } from '@/components/Card/CardGameDefault';
import { Descriptor } from '@/components/Descriptor';
import { Icon } from '@/components/Icon';
import { ImageUri } from '@/components/ImageUri';
import { ListEmpty } from '@/components/ListEmpty';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { SafeAreaDefault } from '@/components/SafeAreaDefault';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewDefault } from '@/components/ViewDefault';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { storageUserSave } from '@/storage/storageUser';
import { colors } from '@/styles/global';
import { type MainNavigatorRoutesProps } from '@/types/routes';
import { AppError } from '@/utils/AppError';
import { URL_API } from '@env';
import { isAxiosError } from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  buttonChangeImageProfileStyle,
  imageProfileContainer,
  imageProfileStyle,
} from './styles';

export const ProfileScreen = () => {
  const [userGames, setUserGames] = useState<IGame[]>([]);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation<MainNavigatorRoutesProps>();

  const { user, removeUserAndToken, setUser } = useAuth();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getUserGames();
    });
  }, [navigation]);

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

  const handleSetRefreshing = () => {
    setRefreshing(true);
    getUserGames();
    setRefreshing(false);
  };

  const openImagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (result.assets) {
        const imageUri = result.assets[0].uri as string;
        const fileName = result.assets[0].uri?.split('/').pop()?.split('_').pop();
        const fileType = result.assets[0].type;

        setModalLoadingVisible(true);

        const formData = new FormData();

        formData.append('image', {
          uri: imageUri,
          name: fileName,
          type: fileType,
        } as unknown);

        const response = await api.patch(`/users/account/avatar/${user?.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const avatarUrl = response.data.avatarUrl;

        const userModified = {
          ...(user as IUser),
          avatar: avatarUrl,
        };

        await storageUserSave(userModified);
        setUser(userModified);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      if (isAppError) Alert.alert('Error', error.message);

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

  return (
    <SafeAreaDefault>
      <ViewDefault>
        <View style={imageProfileContainer}>
          <ImageUri
            imageUri={URL_API.concat(user?.avatar as string)}
            styles={imageProfileStyle}
          />

          <TouchableOpacity
            style={buttonChangeImageProfileStyle}
            onPress={openImagePicker}
            activeOpacity={0.9}
          >
            <Icon iconName="camera" color={colors.text.color} size={20} />
          </TouchableOpacity>
        </View>

        <View style={{ gap: 8 }}>
          <Descriptor fontsize={20} color={colors.text.color} text={user?.username} />

          <Descriptor color={colors.primary.color} text={user?.email} />

          <Descriptor color={colors.sub.color} text={user?.address} />
        </View>
      </ViewDefault>

      <TitleGuide text="Meus Jogos" />

      <FlatList
        data={userGames}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        refreshing={refreshing}
        onRefresh={handleSetRefreshing}
        columnWrapperStyle={{ gap: 8 }}
        contentContainerStyle={{ gap: 8, paddingVertical: 10 }}
        renderItem={({ item }) => (
          <CardGameDefault
            game={item}
            toGame={() => navigation.navigate('Game', { id: item.id })}
            disableBuy
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty text={'Você não comprou nenhum jogo ainda!'} />
        )}
      />

      {modalLoadingVisible ? <ModalLoading /> : <></>}
    </SafeAreaDefault>
  );
};
