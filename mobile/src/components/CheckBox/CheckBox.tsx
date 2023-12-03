import { colors } from '@/styles/global';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../Icon';
import { CheckBoxComponentProps } from './interfaces';
import { checkBoxContainerStyle, checkBoxStyle, checkBoxTextStyle } from './styles';

export const CheckBox = ({
  disponible,
  setDisponible,
  control,
}: CheckBoxComponentProps) => {
  const handleSetDisponible = () => {
    if (disponible) {
      setDisponible(false);
      return false;
    } else setDisponible(true);
    return true;
  };

  return (
    <View>
      <Controller
        control={control}
        name={'disponibility'}
        render={({ field: { onChange, onBlur } }) => (
          <TouchableOpacity
            onPress={() => {
              const value = handleSetDisponible();
              onChange(value);
            }}
            activeOpacity={0.9}
            style={checkBoxContainerStyle}
            onBlur={() => onBlur()}
          >
            <View
              style={{
                ...checkBoxStyle,
                borderColor: disponible
                  ? colors.primary.color
                  : checkBoxStyle.borderColor,
                backgroundColor: disponible
                  ? colors.primary.color
                  : checkBoxStyle.backgroundColor,
              }}
            >
              {disponible && (
                <Icon
                  color={colors.text.color}
                  iconName="check"
                  size={15}
                  strokeWidth={'3'}
                />
              )}
            </View>
            <Text
              style={{
                ...checkBoxTextStyle,
                color: disponible ? colors.text.color : colors.border.color,
              }}
            >
              Habilitar disponibilidade
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
