import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { colors } from '@/styles/global';
import { type InputComponentProps } from './interfaces';
import { inputBackgroundStyle, inputPropsStyle } from './styles';

export const Input = ({
  iconName,
  name,
  secure,
  type,
  text,
  control,
  errors,
  error,
  changeMessage,
}: InputComponentProps) => {
  const [focus, setFocus] = useState(false);

  const errorsArray = [
    { name: 'username', error: errors.username },
    { name: 'email', error: errors.email },
    { name: 'password', error: errors.password },
    { name: 'new_password', error: errors.new_password },
    { name: 'repeatPassword', error: errors.repeatPassword },
    { name: 'title', error: errors.title },
    { name: 'year', error: errors.year },
    { name: 'price', error: errors.price },
    { name: 'genre', error: errors.genre },
    { name: 'disponibility', error: errors.disponibility },
    { name: 'name', error: errors.name },
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
          ...inputBackgroundStyle,
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
              style={{ ...inputPropsStyle, width: iconName ? '90%' : '100%' }}
              secureTextEntry={secure}
              inputMode={type}
              onBlur={() => {
                setFocus(false);
                onBlur();
              }}
              onChangeText={(value) => {
                onChange(value);
                changeMessage && changeMessage('');
              }}
              value={typeof value == 'number' ? value.toString() : value}
              onFocus={() => setFocus(true)}
              focusable={true}
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
