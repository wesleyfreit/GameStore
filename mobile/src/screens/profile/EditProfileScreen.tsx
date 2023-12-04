import React, { useState } from 'react';
import { Alert, SafeAreaView, TouchableOpacity } from 'react-native';

import { Icon } from '@/components/Icon';
import { ModalLoading } from '@/components/Modal/ModalLoading';
import { useAuth } from '@/hooks/useAuth';
import { storageUserRemove } from '@/storage/storageUser';
import { colors } from '@/styles/global';
import { AppError } from '@/utils/AppError';

export const EditProfileScreen = () => {
  const [modalLoadingVisible, setModalLoadingVisible] = useState(false);
  const { setUser } = useAuth();

  const handleSignOut = async () => {
    setModalLoadingVisible(true);

    try {
      setUser({} as IUser);
      await storageUserRemove();
    } catch (error) {
      const isAppError = error instanceof AppError;

      if (isAppError) {
        Alert.alert(error.message);
      }
    } finally {
      setModalLoadingVisible(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', paddingHorizontal: 8.5 }}>
      <TouchableOpacity onPress={handleSignOut}>
        <Icon iconName={'signout'} color={colors.danger.color} size={24} />
      </TouchableOpacity>

      {modalLoadingVisible ? <ModalLoading /> : <></>}
    </SafeAreaView>
  );
};
