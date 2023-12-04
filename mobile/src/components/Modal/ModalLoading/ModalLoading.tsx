import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/styles/global';
import { modalBackgroundStyle } from './styles';

export const ModalLoading = () => {
  const { isLoadingUserStorageData } = useAuth();

  return (
    <Modal transparent>
      <View
        style={{
          ...modalBackgroundStyle,
          backgroundColor: isLoadingUserStorageData
            ? colors.theme.color
            : 'rgba(0, 0, 0, 0.25)',
        }}
      >
        <ActivityIndicator size={'large'} color={colors.primary.color} />
      </View>
    </Modal>
  );
};
