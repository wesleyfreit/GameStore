import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';

import { Button } from '@/components/Button';
import { GoogleMaps } from '@/components/GoogleMaps/GoogleMaps';
import { ModalPopup } from '@/components/Modal/ModalPopup';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewAuth } from '@/components/ViewAuth';
import { GoogleMapsContext } from '@/contexts/GoogleMaps/GoogleMapsContext';
import { AuthFunctionProps } from '@/types/auth';

export const SetAdressScreen = ({ navigation }: AuthFunctionProps) => {
  const [visible, setVisible] = useState(false);
  const { coords } = useContext(GoogleMapsContext);

  const handleSaveAddress = () => {
    if (coords) {
      navigation.goBack();
      console.log(coords);
    } else setVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <ViewAuth>
        <TitleGuide text={'Selecione seu endereço no mapa.'} />

        <GoogleMaps />

        <ModalPopup
          iconName={'danger'}
          title={'Você não adicionou um ponto com sua localização no mapa.'}
          buttonTitle={'Inserir ponto no mapa'}
          setVisible={setVisible}
          visible={visible}
        />
        <Button text={'Selecionar'} onClick={handleSaveAddress} />
      </ViewAuth>
    </SafeAreaView>
  );
};
