import { Button } from '@/components/Button';
import { GameDescribe } from '@/components/GameDescribe';
import { Icon } from '@/components/Icon';
import { ImageUri } from '@/components/ImageUri';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { SafeAreaDefault } from '@/components/SafeAreaDefault';
import { TitleDefault } from '@/components/Title/TitleDefault';
import { ViewDefault } from '@/components/ViewDefault';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { storageCartTokenGet, storageCartTokenSave } from '@/storage/storageCartToken';
import { colors } from '@/styles/global';
import { MainNavigatorRoutesProps } from '@/types/routes';
import { URL_API } from '@env';
import { useNavigation, useRoute } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {
  aboutDescriptionStyle,
  aboutTitleStyle,
  backgroundImageStyle,
  cardStyle,
  imageStyle,
} from './styles';

export const GameScreen = () => {
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [game, setGame] = useState<IGame>();
  const [bought, setBought] = useState(false);

  const navigation = useNavigation<MainNavigatorRoutesProps>();
  const route = useRoute();
  const { removeUserAndToken } = useAuth();

  useEffect(() => {
    if (route.params && 'slug' in route.params) {
      handleSetGame(route.params.slug as string);
    }

    if (route.params && 'bought' in route.params) {
      setBought(route.params.bought as boolean);
    }
  }, [navigation]);

  const handleSetGame = async (slug: string) => {
    setModalLoadingVisible(true);

    try {
      const response = await api.get(`/games/${slug}`);
      setGame(response.data.game);
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data;
        Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
      }
    } finally {
      setModalLoadingVisible(false);
    }
  };

  const addToCart = async (id: string) => {
    setModalLoadingVisible(true);
    try {
      const cartToken = await storageCartTokenGet();

      if (cartToken) api.defaults.headers.common['cart_items'] = cartToken;

      const { data } = await api.put(`/cart/${id}`);

      await storageCartTokenSave(data.cart_items);

      navigation.navigate('Cart');

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
            if (message.error === 'Item is already on the cart') {
              ToastAndroid.show('Item já está no carrinho', 300);
              navigation.navigate('Cart');
            }

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

  const formatCurrency = (value: number) => {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

    return formattedValue;
  };

  return (
    <>
      {modalLoadingVisible ? <ModalLoading /> : <></>}

      <ImageBackground
        source={{ uri: URL_API.concat(game?.imageUrl as string) }}
        style={backgroundImageStyle}
        imageStyle={{ position: 'absolute', opacity: 0.1 }}
      >
        <SafeAreaDefault>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ViewDefault>
              <TitleDefault text={game?.title.toUpperCase() as string} align={'left'} />
            </ViewDefault>

            <ViewDefault>
              <ImageUri
                imageUri={URL_API.concat(game?.imageUrl as string)}
                styles={imageStyle}
              />
              <View style={cardStyle}>
                <GameDescribe title={'Título'} describe={game?.title as string} />

                <GameDescribe title={'Gênero'} describe={game?.genre?.name as string} />

                <GameDescribe title={'Lançamento'} describe={game?.year as number} />

                <GameDescribe
                  title={'Preço'}
                  describe={formatCurrency(game?.price as number)}
                />

                <GameDescribe title={'Plataforma'} describe={'Windows'} />

                <GameDescribe title={'Ativação'} describe={'Chave de ativação'} />
              </View>
            </ViewDefault>

            <ViewDefault>
              <Text style={aboutTitleStyle}>SOBRE O JOGO</Text>
              <Text style={aboutDescriptionStyle}>{game?.description} </Text>
            </ViewDefault>
          </ScrollView>

          {!bought && game?.disponibility ? (
            <ViewDefault>
              <Button
                onClick={() => addToCart(game?.id as string)}
                text={
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                    }}
                  >
                    <Icon
                      iconName={'cart'}
                      size={20}
                      color={colors.text.color}
                      strokeWidth={'2.8'}
                    />
                    <Text style={{ fontWeight: 'bold', color: colors.text.color }}>
                      {formatCurrency(game?.price as number)}
                    </Text>
                  </View>
                }
              />
            </ViewDefault>
          ) : (
            <></>
          )}
        </SafeAreaDefault>
      </ImageBackground>
    </>
  );
};
