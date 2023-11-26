import React, { useEffect, useRef } from 'react';
import { Animated, Modal, View } from 'react-native';

import { Button } from '@/components/Button';
import { TitleModal } from '@/components/Title/TitleModal/TitleModal';
import { type ModalPopupComponentProps } from './interfaces';
import { modalBackgroundStyle, modalContainerStyle } from './styles';
import { Icon } from '@/components/Icon/Icon';
import { selectColor } from '@/lib/selectColor';

export const ModalPopup = ({
  visible,
  setVisible,
  navigation,
  iconName,
  type,
}: ModalPopupComponentProps) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible)
      Animated.spring(scaleValue, {
        toValue: 1,
        speed: 10,
        useNativeDriver: true,
      }).start();
  }, [visible]);

  const handleSetVisible = () => {
    setTimeout(() => {
      setVisible(false);
      if (navigation) {
        navigation.goBack();
      }
    }, 50);

    Animated.spring(scaleValue, {
      toValue: 0,
      speed: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal transparent visible={visible}>
      <View style={modalBackgroundStyle}>
        <Animated.View
          style={{
            ...modalContainerStyle,
            transform: [{ scale: scaleValue }],
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Icon color={selectColor(type)} iconName={iconName} size={30} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <TitleModal text="Conta criada com sucesso!" />
          </View>
          <Button text={'Entrar na conta'} onClick={handleSetVisible} />
        </Animated.View>
      </View>
    </Modal>
  );
};
