import { Lock, Mail, MapPin, User } from 'lucide-react-native';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

import { colors } from '@/styles/global';
import { useState } from 'react';
import { InputFunctionProps } from './interfaces';
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
  navigation,
  errorAuth,
  changeMessage,
}: InputFunctionProps) => {
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

  const iconsArray = [
    { name: 'mail', icon: <Mail size={24} color={selectColor} /> },
    { name: 'password', icon: <Lock size={24} color={selectColor} /> },
    { name: 'point', icon: <MapPin size={24} color={selectColor} /> },
    { name: 'user', icon: <User size={24} color={selectColor} /> },
  ];

  const componentIcon = iconsArray.find((component) => component.name === iconName);

  return (
    <View>
      <View
        style={{
          ...inputStyle.inputBackground,
          borderColor: selectColor,
        }}
      >
        <View>{componentIcon?.icon}</View>
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
                name === 'address' ? navigation?.push('SetAddress') : <></>;
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
