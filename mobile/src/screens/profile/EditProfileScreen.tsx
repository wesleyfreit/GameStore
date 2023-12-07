import React, { useEffect, useState } from 'react';
import { Alert, ToastAndroid, View } from 'react-native';

import { Button } from '@/components/Button';
import { ItemEditProfile } from '@/components/ItemEditProfile';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { SafeAreaDefault } from '@/components/SafeAreaDefault';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Region } from 'react-native-maps';

import { ModalPopupConfirm } from '@/components/Modal/ModalPopupConfirm';
import { ModalPopupInput } from '@/components/Modal/ModalPopupInput';
import { ViewDefault } from '@/components/ViewDefault';
import { useAuth } from '@/hooks/useAuth';
import { useCoords } from '@/hooks/useCoords';
import { api } from '@/lib/api';
import { editProfileSchema } from '@/schemas/editProfileSchema';
import { storageUserSave } from '@/storage/storageUser';
import { EditProfileInput, ProfileProps } from '@/types/profile';
import { MainNavigatorRoutesProps } from '@/types/routes';
import { AppError } from '@/utils/AppError';

export const EditProfileScreen = () => {
  const [inputProps, setInputProps] = useState<EditProfileInput>({} as EditProfileInput);
  const [profileProps, setProfileProps] = useState<ProfileProps>({} as ProfileProps);
  const [modalConfirmVisible, setConfirmModalVisible] = useState(false);
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const [modalInputVisible, setModalInputVisible] = useState(false);
  const [authError, setAuthError] = useState('');

  const { user, removeUserAndToken, setUser } = useAuth();

  const navigation = useNavigation<MainNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    getValues,
    setError,
    resetField,
  } = useForm({ resolver: yupResolver(editProfileSchema) });

  const { coords, setCoords } = useCoords();

  useEffect(() => {
    navigation.addListener('focus', () => {
      setValues();
    });
  }, [navigation]);

  const setValues = () => {
    if (!getValues('email')) {
      const values = {
        username: user?.username as string,
        address: user?.address as string,
        email: user?.email as string,
      };

      setValue('username', values.username);
      setValue('address', values.address);
      setValue('email', values.email);

      setProfileProps(values);
    }
  };

  useEffect(() => {
    if (coords && coords.latitude) {
      getAddress();
    }
  }, [coords, navigation]);

  const getAddress = async () => {
    setModalLoadingVisible(true);
    try {
      const request = await api.post('/users/getaddress', {
        lat: coords?.latitude,
        lng: coords?.longitude,
      });

      const address = request.data.address;

      setValue('address', address);
      setProfileProps({ ...profileProps, address });

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

  const checkErrors = async () => {
    try {
      await editProfileSchema.validateAt(inputProps.name, {
        [inputProps.name]: getValues(inputProps.name),
      });

      if (authError) {
        return false;
      }

      setProfileProps({ ...profileProps, [inputProps.name]: getValues(inputProps.name) });

      clearErrors();

      return true;
    } catch (error) {
      const isFieldError = error instanceof Error;

      if (isFieldError)
        setError(inputProps.name, {
          type: 'manual',
          message: error.message,
        });

      return false;
    }
  };

  const handleDeleteAccount = async (data: ProfileProps) => {
    setModalLoadingVisible(true);

    try {
      await api.post(`/users/${user?.id}`, { password: data.password });

      ToastAndroid.show('A sua conta foi deletada, agora é impossível acessá-la', 300);

      removeUserAndToken();
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
          case 401:
            if (message.error === `Admin's can't delete your account`)
              ToastAndroid.show('Um administrador não pode deletar a sua conta', 300);

            if (message.error === 'Password is wrong')
              ToastAndroid.show('A senha da conta está incorreta', 300);
            break;
          case 404:
            ToastAndroid.show('A sessão atual é inválida', 300);
            removeUserAndToken();
            break;
          default:
            Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
            break;
        }
      }
      setProfileProps({ ...profileProps, password: undefined, new_password: undefined });

      resetField('password');
      resetField('new_password');
    }
  };

  const handleSignOut = async () => {
    setModalLoadingVisible(true);

    try {
      removeUserAndToken();
      ToastAndroid.show('Sua conta foi desconectada', 300);
    } catch (error) {
      const isAppError = error instanceof AppError;

      if (isAppError) {
        Alert.alert(error.message);
      }
    } finally {
      setModalLoadingVisible(false);
    }
  };

  const handleSave = async (data: ProfileProps) => {
    setModalLoadingVisible(true);
    try {
      const response = await api.put(`/users/${user?.id}`, {
        username: data.username,
        address: data.address,
        email: data.email,
        password: data.password,
        new_password: profileProps.new_password ? data.new_password : undefined,
      });

      const { email, username, address } = response.data.user;

      const userModified = {
        ...(user as IUser),
        email,
        username,
        address,
      };

      await storageUserSave(userModified);
      setUser(userModified);

      setModalLoadingVisible(false);

      ToastAndroid.show('Dados atualizados com sucesso', 300);

      resetField('password');
      resetField('new_password');

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
          case 401:
            ToastAndroid.show('A senha da conta está incorreta', 300);
            break;
          case 404:
            ToastAndroid.show('A sessão atual é inválida', 300);
            removeUserAndToken();
            break;
          case 409:
            setAuthError(message.error);

            if (message.error === 'Username in use')
              ToastAndroid.show('O nome de usuário inserido já está em uso', 300);

            if (message.error === 'Email in use')
              ToastAndroid.show('O email inserido já está em uso', 300);

            break;
          default:
            Alert.alert('Erro', `A tentativa gerou o seguinte erro: ${message.error}`);
            break;
        }
      }
      setProfileProps({ ...profileProps, password: undefined, new_password: undefined });

      resetField('password');
      resetField('new_password');
    }
  };

  const defineIsConfirm = () => {
    setModalInputVisible(false);

    if (inputProps.name === 'password') {
      !getValues('new_password') ? setValue('new_password', '$Aaaa1') : undefined;
      if (!inputProps.isDelete) handleSubmit(handleSave)();
      else setConfirmModalVisible(true);
    }
  };

  return (
    <SafeAreaDefault justifyContent="space-between" paddingHorizontal={25}>
      <ViewDefault>
        <View style={{ gap: 10 }}>
          <TitleGuide text={'Perfil'} fontsize={16} />

          <ItemEditProfile
            onClick={() => {
              setInputProps({
                title: 'Alterar nick de usuário',
                iconName: 'user',
                name: 'username',
                text: 'Inserir o novo nick de usuário',
              });
              setModalInputVisible(true);
            }}
            title={'Nome de Usuário'}
            text={profileProps.username ? profileProps.username : user?.username}
          />

          <ItemEditProfile
            onClick={() => navigation.navigate('SetAddress')}
            title={'Endereço'}
            text={profileProps.address ? profileProps.address : user?.address}
          />
        </View>

        <View style={{ gap: 10 }}>
          <TitleGuide text={'Conta'} fontsize={16} />

          <ItemEditProfile
            onClick={() => {
              setInputProps({
                title: 'Alterar email',
                iconName: 'mail',
                name: 'email',
                text: 'Inserir o novo email',
              });
              setModalInputVisible(true);
            }}
            title={'Email'}
            text={profileProps.email ? profileProps.email : user?.email}
          />

          <ItemEditProfile
            onClick={() => {
              setInputProps({
                title: 'Alterar senha',
                iconName: 'password',
                name: 'new_password',
                text: 'Inserir a nova senha',
                secure: true,
              });
              setModalInputVisible(true);
            }}
            title={'Senha'}
            text={'********'}
          />
        </View>

        <View style={{ gap: 20 }}>
          <TitleGuide text={'Mais'} fontsize={16} />

          <ItemEditProfile
            onClick={() => {
              setInputProps({
                title: 'Confirmar a senha',
                iconName: 'password',
                name: 'password',
                text: 'Inserir a senha atual',
                secure: true,
                isDelete: true,
              });
              setModalInputVisible(true);
            }}
            text={'Deletar a conta'}
            iconName={'trash'}
            modeBtn
          />

          <ItemEditProfile
            onClick={handleSignOut}
            text={'Sair da conta'}
            iconName={'signout'}
            modeBtn
          />
        </View>
      </ViewDefault>

      {modalLoadingVisible ? <ModalLoading /> : <></>}

      <ModalPopupInput
        visible={modalInputVisible}
        inputProps={inputProps}
        errors={errors}
        control={control}
        isConfirm={defineIsConfirm}
        isCancel={() => {
          setValue(inputProps.name, profileProps[inputProps.name]!);
          setModalInputVisible(false);
          clearErrors();
        }}
        error={authError}
        changeMessage={setAuthError}
        checkErrors={checkErrors}
      />

      <ModalPopupConfirm
        visible={modalConfirmVisible}
        setVisible={setConfirmModalVisible}
        iconName={'warning'}
        title={
          'Você realmente deseja deletar a sua conta? Esta ação é irreversível, escolha com atenção!'
        }
        isTrue={handleSubmit(handleDeleteAccount)}
      />

      <ViewDefault>
        <Button
          text={'Salvar Alterações'}
          onClick={() => {
            setInputProps({
              title: 'Confirmar senha',
              iconName: 'password',
              name: 'password',
              text: 'Inserir a senha atual',
              secure: true,
            });
            setModalInputVisible(true);
          }}
        />
      </ViewDefault>
    </SafeAreaDefault>
  );
};
