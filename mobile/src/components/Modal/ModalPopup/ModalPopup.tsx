import { Button } from '@/components/Button';
import { TitleModal } from '@/components/Title/TitleModal/TitleModal';
import { colors } from '@/styles/global';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CheckCircle } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Modal, StyleSheet, View } from 'react-native';

export const ModalPopup = ({
  visible,
  setVisible,
  navigation,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
  navigation?: NativeStackNavigationProp<ParamListBase>;
}) => {
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
      navigation ? navigation.goBack() : null;
    }, 50);

    Animated.spring(scaleValue, {
      toValue: 0,
      speed: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalBackgroundStyle}>
        <Animated.View
          style={{ ...styles.modalContainerStyle, transform: [{ scale: scaleValue }] }}
        >
          <View style={{ alignItems: 'center' }}>
            <CheckCircle size={30} color={colors.success.color} />
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

const styles = StyleSheet.create({
  modalBackgroundStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerStyle: {
    gap: 15,
    width: '85%',
    backgroundColor: colors.theme.color,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 3,
  },
});
