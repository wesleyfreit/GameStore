import React, { useEffect, useRef } from 'react';
import { Animated, Modal, View } from 'react-native';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { TitleDefault } from '@/components/Title/TitleDefault';
import { type ModalPopupInputComponentProps } from './interfaces';
import { modalBackgroundStyle, modalContainerStyle } from './styles';

export const ModalPopupInput = ({
  control,
  visible,
  isConfirm,
  isCancel,
  errors,
  error,
  inputProps,
  checkErrors,
  changeMessage,
}: ModalPopupInputComponentProps) => {
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
            <TitleDefault text={inputProps.title} />
          </View>

          <Input
            iconName={inputProps.iconName}
            name={inputProps.name}
            type={inputProps.type}
            text={inputProps.text}
            secure={inputProps.secure}
            control={control}
            errors={errors}
            error={
              error === 'Username in use' && inputProps.name === 'username'
                ? 'Este nome de usuário já está em uso.'
                : error === 'Email in use' && inputProps.name === 'email'
                  ? 'Este email já está em uso.'
                  : undefined
            }
            changeMessage={changeMessage}
          />

          <View
            style={{
              gap: 7,
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1 }}>
              <Button
                text={'Confirmar'}
                onClick={async () => {
                  const value = await checkErrors();
                  if (value) {
                    setTimeout(() => {
                      isConfirm();
                    }, 100);
                    handleSetVisible();
                  }
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Button
                text={'Cancelar'}
                onClick={() => {
                  setTimeout(() => {
                    isCancel();
                  }, 100);
                  handleSetVisible();
                }}
                bgColor="danger"
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};
