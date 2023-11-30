import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { colors } from '@/styles/global';
import { Icon } from '../Icon/Icon';
import { type InputComponentProps } from './interfaces';
import { inputStyle } from './styles';

export const Input = ({
  iconName,
  name,
  secure,
  type,
  text,
  control,
  errors,
  valueAddress,
  errorAuth,
  changeMessage,
  onClick,
}: InputComponentProps) => {
  const [focus, setFocus] = useState(false);

  const errorsArray = [
    { name: 'username', error: errors.username },
    { name: 'email', error: errors.email },
    { name: 'address', error: errors.address },
    { name: 'password', error: errors.password },
    { name: 'repeatPassword', error: errors.repeatPassword },
  ];

  const errorMessage = errorsArray.find((error) => error.name === name);

  const selectColor = !errorMessage?.error?.message
    ? !errorAuth
      ? focus
        ? colors.primary.color
        : colors.border.color
      : colors.danger.color
    : colors.danger.color;

  return (
    <View>
      <View
        style={{
          ...inputStyle.inputBackground,
          borderColor: selectColor,
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
              style={inputStyle.inputProps}
              secureTextEntry={secure}
              inputMode={type}
              onBlur={() => {
                setFocus(false);
                onBlur;
              }}
              onChangeText={(value) => {
                onChange(value);
                changeMessage && changeMessage('');
              }}
              value={!valueAddress ? value : valueAddress}
              onFocus={() => {
                setFocus(true);
                name === 'address' ? onClick : <></>;
              }}
              focusable={true}
            />
          )}
        />
      </View>
      {errorMessage?.error?.message || errorAuth ? (
        <Text style={{ color: selectColor }}>
          {errorAuth ? errorAuth : (errorMessage?.error?.message as string)}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};
