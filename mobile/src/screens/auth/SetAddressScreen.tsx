import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import { Button } from '@/components/Button';
import { GoogleMaps } from '@/components/GoogleMaps/GoogleMaps';
import { ModalPopup } from '@/components/Modal/ModalPopup';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewDefault } from '@/components/ViewDefault';
import { useCoords } from '@/hooks/useCoords';
import { type AuthFunctionProps } from '@/types/auth';
import { type Region } from 'react-native-maps';

export const SetAdressScreen = ({ navigation }: AuthFunctionProps) => {
  const [point, setPoint] = useState<Region | undefined>(undefined);
  const [visible, setVisible] = useState(false);

  const { setCoords } = useCoords();

  const handleSetSave = () => {
    if (point) {
      setCoords(point);
      navigation.goBack();
    } else setVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <ViewDefault>
        <TitleGuide text={'Selecione seu endereço no mapa.'} />

        <GoogleMaps point={point} setPoint={setPoint} />

        <ModalPopup
          iconName={'danger'}
          title={'Você não inseriu nenhum ponto no mapa.'}
          buttonTitle={'Inserir ponto no mapa'}
          setVisible={setVisible}
          visible={visible}
        />
        <Button text={'Selecionar'} onClick={handleSetSave} />
      </ViewDefault>
    </SafeAreaView>
  );
};
