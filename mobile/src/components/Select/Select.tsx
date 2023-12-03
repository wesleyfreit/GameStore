import { colors } from '@/styles/global';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';
import { selectContainerStyle } from './styles';
import { SelectComponentProps } from './interfaces';

export const Select = ({
  control,
  errors,
  array,
  item,
  setItem,
}: SelectComponentProps) => {
  const [focus, setFocus] = useState(false);

  const selectColor = !errors.genre
    ? focus
      ? colors.primary.color
      : colors.border.color
    : colors.danger.color;

  return (
    <View>
      <View
        style={{
          ...selectContainerStyle,
          borderColor: selectColor,
        }}
      >
        <Controller
          control={control}
          name={'genre'}
          render={({ field: { onChange, onBlur } }) => (
            <Picker
              selectedValue={item}
              onValueChange={(value) => {
                setItem(value);
                onChange(value);
              }}
              onBlur={() => {
                onBlur();
                setFocus(false);
              }}
              onFocus={() => setFocus(true)}
            >
              <Picker.Item label={'Selecione um gênero'} color={selectColor} enabled />
              {array.map((item) => {
                return (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                    color={colors.text.color}
                  />
                );
              })}
            </Picker>
          )}
        />
      </View>
      <View>
        {errors.genre ? (
          <Text style={{ color: selectColor }}>{errors.genre.message as string}</Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};
