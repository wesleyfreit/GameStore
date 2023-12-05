import React, { useEffect, useRef } from 'react';
import { Animated, Modal, View } from 'react-native';

import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { TitleDefault } from '@/components/Title/TitleDefault';
import { selectColor } from '@/lib/selectColor';
import { modalBackgroundStyle, modalContainerStyle } from './styles';

export const ModalPopupConfirm = ({
  iconName,
  setVisible,
  title,
  visible,
  isTrue,
}: ModalPopupConfirmComponentProps) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible)
      Animated.spring(scaleValue, {
        toValue: 1,
        speed: 10,
        useNativeDriver: true,
      }).start();
  }, [visible]);

  const handleSetVisible = async () => {
    setTimeout(() => {
      setVisible(false);
    }, 100);

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
            <Icon color={selectColor(iconName)} iconName={iconName} size={35} />
          </View>
          <View style={{ alignItems: 'center' }}>
            <TitleDefault text={title} />
          </View>
          <View
            style={{
              gap: 7,
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1 }}>
              <Button
                text={'Sim'}
                onClick={async () => {
                  await handleSetVisible();
                  isTrue();
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button text={'Não'} onClick={handleSetVisible} bgColor="danger" />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
