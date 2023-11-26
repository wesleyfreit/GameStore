import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, SafeAreaView, ScrollView } from 'react-native';

import { Button } from '@/components/Button';
import { ClickableText } from '@/components/ClickableText';
import { Input } from '@/components/Input';
import { ModalPopup } from '@/components/Modal/ModalPopup';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewAuth } from '@/components/ViewAuth';
import { GoogleMapsContext } from '@/contexts/GoogleMaps/GoogleMapsContext';
import { api } from '@/lib/axios';
import { signUpSchema } from '@/schemas/signUpSchema';
import { type AuthFunctionProps } from '@/types/auth';
import { isAxiosError } from 'axios';

export const SignUp = ({ navigation }: AuthFunctionProps) => {
  const [address, setAddress] = useState('');
  const [authError, setAuthError] = useState('');
  const [modalVisible, setModalVisible] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema(address)),
  });

  const { coords, setCoords } = useContext(GoogleMapsContext);

  useEffect(() => {
    if (coords) {
      (async () => {
        try {
          const request = await api.post('/users/getaddress', {
            lat: coords.latitude,
            lng: coords.longitude,
          });
          setAddress(request.data.address);
          setCoords(undefined);
        } catch (error) {
          Alert.alert('Ocorreu um erro, tente novamente');
        }
      })();
    }
  }, [coords]);

  const handleSignUp = async (data: SignUpUser) => {
    try {
      await api.post('/users/signup', {
        username: data.username,
        email: data.email,
        address: address,
        password: data.password,
        confirm_password: data.repeatPassword,
      });

      setModalVisible(true);
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data;
        switch (status) {
          case 409:
            setAuthError(message.error);
            break;
          default:
            Alert.alert(`A tentativa gerou o seguinte erro: ${message}`);
            break;
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <ScrollView>
        <ViewAuth>
          <TitleGuide text={'Dados cadastrais'} />

          <Input
            iconName="user"
            name={'username'}
            text={'Nick de usuário*'}
            control={control}
            errors={errors}
            errorAuth={
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
            errorAuth={
              authError === 'Email in use' ? 'Este email já está em uso.' : undefined
            }
            changeMessage={setAuthError}
          />

          <Input
            iconName={'point'}
            name={'address'}
            text={'Endereço*'}
            control={control}
            errors={errors}
            valueAddress={address}
            navigation={navigation}
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

          <ModalPopup
            visible={modalVisible}
            setVisible={setModalVisible}
            navigation={navigation}
            iconName={'success'}
            type={'success'}
          />

          <Button text={'Criar conta'} onClick={handleSubmit(handleSignUp)} />

          <ClickableText navigation={navigation} textClickable={'Já tenho uma conta'} />
        </ViewAuth>
      </ScrollView>
    </SafeAreaView>
  );
};
