import { yupResolver } from '@hookform/resolvers/yup';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';

import Logo from '@/assets/svgs/logo.svg';
import { Button } from '@/components/Button';
import { ClickableText } from '@/components/ClickableText';
import { Input } from '@/components/Input';
import { ModalPopup } from '@/components/Modal/ModalPopup';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewAuth } from '@/components/ViewAuth';
import { api } from '@/lib/axios';
import { signInSchema } from '@/schemas/signInSchema';
import { colors } from '@/styles/global';
import { AuthFunctionProps } from '@/types/auth';

export const SignInScreen = ({ navigation }: AuthFunctionProps) => {
  const [authError, setAuthError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInSchema) });

  const handleSignIn = async (data: SignInUser) => {
    try {
      const response = await api.post('/users/signin', {
        email: data.email,
        password: data.password,
      });

      const token = response.data.token;
      console.log(token);
    } catch (error) {
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
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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

        <ViewAuth>
          <TitleGuide text={'Entrar'} />

          <Input
            iconName={'mail'}
            name={'email'}
            type={'email'}
            text={'Email'}
            control={control}
            errors={errors}
            errorAuth={
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
            errorAuth={
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

          <Button text={'Entrar'} onClick={handleSubmit(handleSignIn)} />

          <ClickableText
            navigation={navigation}
            navigateLocation={'SignUp'}
            textNotClickable={'Não tem uma conta? '}
            textClickable={'Criar conta.'}
          />
        </ViewAuth>
      </ScrollView>
    </SafeAreaView>
  );
};
