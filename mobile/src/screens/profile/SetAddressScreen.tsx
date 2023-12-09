import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { type Region } from 'react-native-maps';

import { Button } from '@/components/Button';
import { GoogleMaps } from '@/components/GoogleMaps/GoogleMaps';
import { ModalPopup } from '@/components/Modal/ModalPopup';
import { SafeAreaDefault } from '@/components/SafeAreaDefault';
import { TitleGuide } from '@/components/Title/TitleGuide';
import { ViewDefault } from '@/components/ViewDefault';

import { useCoords } from '@/hooks/useCoords';
import { type AuthNavigatorRoutesProps } from '@/types/routes';

export const SetAdressScreen = () => {
  const [point, setPoint] = useState<Region | undefined>(undefined);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const route = useRoute();
  const { setCoords } = useCoords();

  useEffect(() => {
    if (route.params && 'coords' in route.params) {
      const coords = route.params.coords as string[];

      setPoint({
        latitude: parseFloat(coords[0]),
        longitude: parseFloat(coords[1]),
        latitudeDelta: 0.000949,
        longitudeDelta: 0.000952,
      });
    }
  }, [navigation]);

  const handleSetSave = () => {
    if (point) {
      setCoords(point);
      navigation.goBack();
    } else setVisible(true);
  };

  return (
    <SafeAreaDefault>
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
    </SafeAreaDefault>
  );
};
