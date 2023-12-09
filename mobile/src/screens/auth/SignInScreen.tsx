import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { ClickableText } from '@/components/ClickableText';
import { Input } from '@/components/Input';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { ModalPopup } from '@/components/Modal/ModalPopup';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewDefault } from '@/components/ViewDefault';

import Logo from '@/assets/svgs/logo.svg';
import { SafeAreaDefault } from '@/components/SafeAreaDefault';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { signInSchema } from '@/schemas/signInSchema';
import { storageAuthTokenSave } from '@/storage/storageAuthToken';
import { storageCartTokenSave } from '@/storage/storageCartToken';
import { storageUserSave } from '@/storage/storageUser';
import { colors } from '@/styles/global';
import { type AuthNavigatorRoutesProps } from '@/types/routes';

export const SignInScreen = () => {
  const [authError, setAuthError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { setUserAndToken } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInSchema) });

  const handleSignIn = async (data: SignInUser) => {
    setModalLoadingVisible(true);

    try {
      const response = await api.post('/users/signin', {
        email: data.email,
        password: data.password,
      });

      const { token, user, cartItems } = response.data;

      if (token && user) {
        await storageUserSave(user);
        await storageAuthTokenSave(token);

        setUserAndToken(user, token);
      }

      if (cartItems) await storageCartTokenSave(cartItems);

      setModalLoadingVisible(false);
    } catch (error) {
      setModalLoadingVisible(false);

      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data;
        switch (status) {
          case 401:
            setAuthError(message.error);
            break;
          case 404:
            setAuthError(message.error);
            break;
          default:
            Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message}`);
            break;
        }
      }
    }
  };

  return (
    <SafeAreaDefault>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginVertical: 15 }}>
          <Logo />
          <Text
            style={{
              fontFamily: 'Inder-Regular',
              fontSize: 38,
              color: colors.primary.color,
            }}
          >
            GAME<Text style={{ color: colors.text.color }}>STORE</Text>
          </Text>
        </View>

        <ViewDefault>
          <TitleGuide text={'Entrar'} />

          <Input
            iconName={'mail'}
            name={'email'}
            type={'email'}
            text={'Email'}
            control={control}
            errors={errors}
            error={
              authError === 'Account not found'
                ? 'Este email não pertence a nenhuma conta.'
                : undefined
            }
            changeMessage={setAuthError}
          />

          <Input
            iconName={'password'}
            name={'password'}
            secure={true}
            text={'Senha'}
            control={control}
            errors={errors}
            error={
              authError === 'Invalid password' ? 'A senha está incorreta.' : undefined
            }
            changeMessage={setAuthError}
          />

          <ClickableText
            textClickable={'Esqueceu a sua senha?'}
            marginLeft={'auto'}
            onClick={() => setModalVisible(true)}
          />

          <ModalPopup
            visible={modalVisible}
            setVisible={setModalVisible}
            iconName={'danger'}
            title={'Esta opção está temporariamente indisponível'}
            buttonTitle={'Fechar'}
          />

          {modalLoadingVisible ? <ModalLoading /> : <></>}

          <Button text={'Entrar'} onClick={handleSubmit(handleSignIn)} />

          <ClickableText
            onClick={() => navigation.push('SignUp')}
            textNotClickable={'Não tem uma conta? '}
            textClickable={'Criar conta.'}
          />
        </ViewDefault>
      </ScrollView>
    </SafeAreaDefault>
  );
};
