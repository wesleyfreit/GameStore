import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

import { colors } from '@/styles/global';
import { modalBackgroundStyle } from './styles';

export const ModalLoading = () =>
  // {
  //   visible,
  //   iconName,
  //   title,
  //   buttonTitle,
  //   setVisible,
  //   navigateTo,
  // }: ModalPopupComponentProps
  {
    // const scaleValue = useRef(new Animated.Value(0)).current;

    // useEffect(() => {
    //   if (visible)
    //     Animated.spring(scaleValue, {
    //       toValue: 1,
    //       speed: 10,
    //       useNativeDriver: true,
    //     }).start();
    // }, [visible]);

    // const handleSetVisible = () => {
    //   setTimeout(() => {
    //     setVisible(false);
    //     if (navigateTo) navigateTo();
    //   }, 50);

    //   Animated.spring(scaleValue, {
    //     toValue: 0,
    //     speed: 10,
    //     useNativeDriver: true,
    //   }).start();
    // };

    return (
      <Modal transparent>
        <View style={modalBackgroundStyle}>
          <ActivityIndicator size={'large'} color={colors.primary.color} />
        </View>
      </Modal>
    );
  };
