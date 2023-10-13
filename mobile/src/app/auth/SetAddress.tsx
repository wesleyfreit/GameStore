import { useState } from 'react';
import { SafeAreaView } from 'react-native';

import { Button } from '@/components/Button';
import { GoogleMaps } from '@/components/GoogleMaps/GoogleMaps';
import { TitleGuide } from '@/components/Title';
import { ViewAuth } from '@/components/ViewAuth';
import { AuthFunctionProps } from '@/types/auth';

export const SetAdress = ({ navigation }: AuthFunctionProps) => {
  const [save, setSave] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <ViewAuth>
        <TitleGuide text={'Selecione seu endereço no mapa.'} />

        <GoogleMaps navigation={save ? navigation : undefined} />

        <Button text={'Selecionar'} onClick={() => setSave(true)} />
      </ViewAuth>
    </SafeAreaView>
  );
};
