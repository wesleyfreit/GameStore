import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { colors } from '@/styles/global';
import { type InputComponentProps } from './interfaces';
import { textereaBackgroundStyle, textereaPropsStyle } from './styles';

export const Texterea = ({
  iconName,
  name,
  text,
  control,
  errors,
  valueAddress,
  error,
  height,
  changeMessage,
  onClick,
}: InputComponentProps) => {
  const [focus, setFocus] = useState(false);

  const errorsArray = [
    { name: 'address', error: errors.address },
    { name: 'description', error: errors.description },
  ];

  const errorMessage = errorsArray.find((error) => error.name === name);

  const selectColor = !errorMessage?.error?.message
    ? !error
      ? focus
        ? colors.primary.color
        : colors.border.color
      : colors.danger.color
    : colors.danger.color;

  return (
    <View>
      <View
        style={{
          ...textereaBackgroundStyle,
          borderColor: selectColor,
          minHeight: height,
        }}
      >
        {iconName ? <Icon iconName={iconName} size={24} color={selectColor} /> : <></>}

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={text}
              placeholderTextColor={selectColor}
              style={{ ...textereaPropsStyle, width: iconName ? '90%' : '100%' }}
              onBlur={() => {
                setFocus(false);
                onBlur();
              }}
              onChangeText={(value) => {
                onChange(value);
                changeMessage && changeMessage('');
              }}
              value={
                valueAddress && valueAddress != value
                  ? valueAddress && onChange(valueAddress)
                  : value
              }
              onFocus={() => {
                setFocus(true);
                name === 'address' && onClick ? onClick() : undefined;
              }}
              focusable={true}
              multiline
            />
          )}
        />
      </View>
      {errorMessage?.error?.message || error ? (
        <Text style={{ color: selectColor }}>
          {error ? error : (errorMessage?.error?.message as string)}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};
