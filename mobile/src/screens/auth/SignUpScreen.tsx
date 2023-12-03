import { yupResolver } from '@hookform/resolvers/yup';
import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, SafeAreaView, ScrollView } from 'react-native';

import { Button } from '@/components/Button';
import { ClickableText } from '@/components/ClickableText';
import { Input } from '@/components/Input';
import { ModalPopup } from '@/components/Modal/ModalPopup';
import { Texterea } from '@/components/Texterea';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewDefault } from '@/components/ViewDefault';
import { useCoords } from '@/hooks/useCoords';
import { api } from '@/lib/api';
import { signUpSchema } from '@/schemas/signUpSchema';
import { AuthFunctionProps } from '@/types/auth';
import { Region } from 'react-native-maps';
import { ModalLoading } from '@/components/Modal/ModalLoading';

export const SignUpScreen = ({ navigation }: AuthFunctionProps) => {
  const [address, setAddress] = useState('');
  const [authError, setAuthError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema(address)),
  });

  const { coords, setCoords } = useCoords();

  useEffect(() => {
    if (coords.latitude) {
      getAddress();
    }
  }, [coords]);

  const getAddress = async () => {
    setModalLoadingVisible(true);

    try {
      const request = await api.post('/users/getaddress', {
        lat: coords?.latitude,
        lng: coords?.longitude,
      });

      setAddress(request.data.address);
      setCoords({} as Region);
      setModalLoadingVisible(false);
    } catch (error) {
      setModalLoadingVisible(false);

      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data;
        if (status == 400) {
          setAuthError(message.error);
        } else Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message}`);
      }
    }
  };

  const handleSignUp = async (data: SignUpUser) => {
    setModalLoadingVisible(true);

    try {
      await api.post('/users/signup', {
        username: data.username,
        email: data.email,
        address: address,
        password: data.password,
        confirm_password: data.repeatPassword,
      });

      setModalVisible(true);
      setModalLoadingVisible(false);
    } catch (error) {
      setModalLoadingVisible(false);

      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data;
        switch (status) {
          case 400:
            setAuthError(message.error);
            break;
          case 409:
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <ViewDefault>
          <TitleGuide text={'Dados cadastrais'} />

          <Input
            iconName="user"
            name={'username'}
            text={'Nick de usuário*'}
            control={control}
            errors={errors}
            error={
              authError === 'Username in use'
                ? 'Este nome de usuário já está em uso.'
                : undefined
            }
            changeMessage={setAuthError}
          />

          <Input
            iconName={'mail'}
            name={'email'}
            type={'email'}
            text={'Email*'}
            control={control}
            errors={errors}
            error={
              authError === 'Email in use' ? 'Este email já está em uso.' : undefined
            }
            changeMessage={setAuthError}
          />

          <Texterea
            iconName={'point'}
            name={'address'}
            text={'Endereço*'}
            control={control}
            errors={errors}
            valueAddress={address}
            onClick={() => navigation.push('SetAddress')}
            error={
              authError === 'Address not found' ? 'Endereço não encontrado.' : undefined
            }
            changeMessage={setAuthError}
          />

          <Input
            iconName={'password'}
            name={'password'}
            text={'Senha*'}
            secure={true}
            control={control}
            errors={errors}
          />

          <Input
            iconName={'password'}
            name={'repeatPassword'}
            text={'Repetir Senha*'}
            secure={true}
            control={control}
            errors={errors}
          />

          {modalLoadingVisible ? <ModalLoading /> : <></>}

          <ModalPopup
            visible={modalVisible}
            setVisible={setModalVisible}
            navigateTo={() => navigation.goBack()}
            iconName={'success'}
            title={'Conta criada com sucesso!'}
            buttonTitle={'Entrar na conta'}
          />

          <Button text={'Criar conta'} onClick={handleSubmit(handleSignUp)} />

          <ClickableText
            onClick={() => navigation.goBack()}
            textClickable={'Já tenho uma conta'}
          />
        </ViewDefault>
      </ScrollView>
    </SafeAreaView>
  );
};
