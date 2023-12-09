import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ToastAndroid, View } from 'react-native';

import { Button } from '@/components/Button';
import { CardGameRectangle } from '@/components/Card/CardGameRetangle';
import { ClickableText } from '@/components/ClickableText';
import { ListEmpty } from '@/components/ListEmpty';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { ModalPopup } from '@/components/Modal/ModalPopup';
import { SafeAreaDefault } from '@/components/SafeAreaDefault';
import { TitleSub } from '@/components/Title/TitleSub/TitleSub';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import {
  storageCartTokenGet,
  storageCartTokenRemove,
  storageCartTokenSave,
} from '@/storage/storageCartToken';
import { type MainNavigatorRoutesProps } from '@/types/routes';
import { AppError } from '@/utils/AppError';

export const CartScreen = () => {
  const [cart, setCart] = useState<IGame[]>([] as IGame[]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [notAdded, setNotAdded] = useState<string[]>([] as string[]);

  const navigation = useNavigation<MainNavigatorRoutesProps>();

  const { removeUserAndToken } = useAuth();

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    setModalLoadingVisible(true);

    try {
      const cartToken = await storageCartTokenGet();

      if (cartToken) api.defaults.headers.common['cart_items'] = cartToken;

      const { data } = await api.get('/cart');

      if (data.cartItems) {
        setCart(data.cartItems);
      } else setCart([]);
    } catch (error) {
      const isAppError = error instanceof AppError;

      if (isAppError) {
        Alert.alert(error.message);
      }
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

  const removeGame = async (id: string) => {
    setModalLoadingVisible(true);

    try {
      const cartToken = await storageCartTokenGet();

      if (cartToken) {
        api.defaults.headers.common['cart_items'] = cartToken;
        const { data } = await api.delete(`/cart/${id}`);
        await storageCartTokenSave(data.cart_items);

        getCart();

        ToastAndroid.show('Item removido do carrinho', 300);
      }
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
          default:
            Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
            break;
        }
      }
    } finally {
      setModalLoadingVisible(false);
    }
  };

  const cleanCart = async () => {
    setModalLoadingVisible(true);

    try {
      await api.get('/cart/clean');

      await storageCartTokenRemove();
      api.defaults.headers.common['cart_items'] = '';

      getCart();

      ToastAndroid.show('O carrinho foi limpo', 300);
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data;
        Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
      }
    } finally {
      setModalLoadingVisible(false);
    }
  };

  const buyCart = async () => {
    setModalLoadingVisible(true);

    try {
      const response = await api.get('/cart/buy');

      if (response.data.notAdded) {
        setNotAdded(response.data.notAdded);

        setModalVisible(true);
      } else {
        ToastAndroid.show('Os títulos foram adicionados a sua conta', 300);
        navigation.navigate('Menu', { screen: 'Profile' });
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data;
        Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
      }
    } finally {
      await storageCartTokenRemove();
      api.defaults.headers.common['cart_items'] = '';
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

  const getAmount = () => {
    let amount: number = 0;
    cart.map((game) => (amount += game.price));

    return amount;
  };

  const getNotAdded = () => {
    const titles = notAdded.map((title) => `${title}, `).join('');

    return titles.replace(/, $/, '');
  };

  return (
    <SafeAreaDefault>
      {cart.length ? <TitleSub value={'PRODUTO'} /> : <></>}

      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 5 }}
        renderItem={({ item }) => (
          <CardGameRectangle
            game={item}
            toGame={() => navigation.navigate('Game', { slug: item.slug })}
            toRemove={() => removeGame(item.id)}
            price={formatCurrency(item.price)}
          />
        )}
        ListEmptyComponent={() => (
          <>
            <ListEmpty text={'O carrinho está vazio'} />
            <ClickableText
              textClickable={'Adicionar itens ao carrinho'}
              onClick={() => navigation.goBack()}
            />
          </>
        )}
      />

      {cart.length ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 5,
            alignSelf: 'stretch',
          }}
        >
          <TitleSub value={'VALOR TOTAL'} />
          <TitleSub value={formatCurrency(getAmount())} />
        </View>
      ) : (
        <></>
      )}

      {modalLoadingVisible ? <ModalLoading /> : <></>}

      <ModalPopup
        visible={modalVisible}
        setVisible={setModalVisible}
        iconName={'success'}
        title={`Os títulos foram adicionados a sua conta, com exceção de ${getNotAdded()}, porquê ${
          notAdded.length > 1 ? 'eles já existem' : 'ele já existe'
        } na sua conta.`}
        navigateTo={() => navigation.navigate('Menu', { screen: 'Profile' })}
        buttonTitle="Ok"
      />

      {cart.length > 0 ? (
        <View
          style={{
            gap: 7,
            flexDirection: 'row',
            marginVertical: 5,
          }}
        >
          <View style={{ flex: 1 }}>
            <Button text={'Limpar carrinho'} bgColor={'warning'} onClick={cleanCart} />
          </View>

          <View style={{ flex: 1 }}>
            <Button text={'Finalizar pedido'} onClick={buyCart} />
          </View>
        </View>
      ) : (
        <></>
      )}
    </SafeAreaDefault>
  );
};
