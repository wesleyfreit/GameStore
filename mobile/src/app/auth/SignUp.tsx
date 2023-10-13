import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Alert, SafeAreaView, ScrollView } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { ClickableText } from '@/components/ClickableText';
import { Input } from '@/components/Input';
import { TitleGuide } from '@/components/Title';
import { ViewAuth } from '@/components/ViewAuth';
import { GoogleMapsContext } from '@/contexts/GoogleMaps/GoogleMapsContext';
import { api } from '@/lib/axios';
import { signUpSchema } from '@/schemas/signUpSchema';
import { AuthFunctionProps } from '@/types/auth';

export const SignUp = ({ navigation }: AuthFunctionProps) => {
  const [address, setAddress] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema(address)),
  });

  const { coords } = useContext(GoogleMapsContext);

  useEffect(() => {
    if (coords) {
      (async () => {
        try {
          const request = await api.post('/users/getaddress', {
            lat: coords.latitude,
            lng: coords.longitude,
          });
          setAddress(request.data.address);
        } catch (error) {
          Alert.alert('Ocorreu um erro, tente novamente');
        }
      })();
    }
  }, [coords]);

  const handleSignUp = (data: any) => {
    console.log(data);
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
          />

          <Input
            iconName={'mail'}
            name={'email'}
            type={'email'}
            text={'Email*'}
            control={control}
            errors={errors}
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

          <Button text={'Criar conta'} onClick={handleSubmit(handleSignUp)} />

          <ClickableText navigation={navigation} textClickable={'Já tenho uma conta'} />
        </ViewAuth>
      </ScrollView>
    </SafeAreaView>
  );
};
