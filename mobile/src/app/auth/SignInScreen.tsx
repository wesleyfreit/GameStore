import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import Logo from '@/assets/svgs/logo.svg';
import { Button } from '@/components/Button';
import { ClickableText } from '@/components/ClickableText';
import { Input } from '@/components/Input';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewAuth } from '@/components/ViewAuth';
import { signInSchema } from '@/schemas/signInSchema';
import { colors } from '@/styles/global';
import { type AuthFunctionProps } from '@/types/auth';

export const SignInScreen = ({ navigation }: AuthFunctionProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Dashboard');
    }
  }, [isAuthenticated, navigation]);

  const handleSignIn = (data: SignInUser) => {
    console.log(data);
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
          />
          <Input
            iconName={'password'}
            name={'password'}
            secure={true}
            text={'Senha'}
            control={control}
            errors={errors}
          />

          <ClickableText
            navigation={navigation}
            navigateLocation={'RecoverPassword'}
            textClickable={'Esqueceu a sua senha?'}
            marginLeft={'auto'}
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
