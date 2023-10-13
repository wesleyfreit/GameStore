import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView } from 'react-native';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { TitleGuide } from '@/components/Title';
import { ViewAuth } from '@/components/ViewAuth';
import { recoverPasswordSchema } from '@/schemas/recoverPasswordSchema';

export const RecoverPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(recoverPasswordSchema) });

  const handleRecoverPassword = (data: any) => {
    console.log(data);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <ScrollView>
        <ViewAuth>
          <TitleGuide text={'Dados de recuperação'} />

          <Input
            iconName={'mail'}
            name={'email'}
            type={'email'}
            text={'Email de recuperação'}
            control={control}
            errors={errors}
          />

          <Button text={'Buscar'} onClick={handleSubmit(handleRecoverPassword)} />
        </ViewAuth>
      </ScrollView>
    </SafeAreaView>
  );
};
