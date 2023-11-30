import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';

import { Button } from '@/components/Button';
import { GoogleMaps } from '@/components/GoogleMaps/GoogleMaps';
import { ModalPopup } from '@/components/Modal/ModalPopup';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewAuth } from '@/components/ViewAuth';
import { GoogleMapsContext } from '@/contexts/GoogleMaps/GoogleMapsContext';
import { AuthFunctionProps } from '@/types/auth';
import { Region } from 'react-native-maps';

export const SetAdressScreen = ({ navigation }: AuthFunctionProps) => {
  const [point, setPoint] = useState<Region | undefined>(undefined);
  const [visible, setVisible] = useState(false);

  const { setCoords } = useContext(GoogleMapsContext);

  const handleSetSave = () => {
    if (point) {
      setCoords(point);
      navigation.goBack();
    } else setVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <ViewAuth>
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
      </ViewAuth>
    </SafeAreaView>
  );
};
