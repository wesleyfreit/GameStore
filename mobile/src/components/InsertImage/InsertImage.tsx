import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { colors } from '@/styles/global';
import { InsertImageComponentProps, InsertImageErrorProps } from './interfaces';
import {
  insertImageBackgroundStyle,
  insertImageImageStyle,
  insertImageTextStyle,
} from './styles';

export const InsertImage = ({
  control,
  errors,
  setPreview,
  preview,
  imageUrl,
}: InsertImageComponentProps) => {
  const [focus, setFocus] = useState(false);
  const [imageErrorMessage, setImagErrorMessage] = useState<InsertImageErrorProps>(
    {} as InsertImageErrorProps,
  );

  const openImagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result.assets) {
        const image = result.assets[0].uri as string;
        setPreview(image);
        return image;
      }
      setImagErrorMessage({ didCancel: result.didCancel });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setImagErrorMessage({ errorMessage: error.message });
    }
  };

  useEffect(() => {
    if (imageErrorMessage?.didCancel) {
      setFocus(false);
      setImagErrorMessage({});
    }
    if (preview) {
      setFocus(false);
    }
  }, [imageErrorMessage?.didCancel, preview]);

  const selectColor = !imageErrorMessage?.errorMessage
    ? !errors.image
      ? focus
        ? colors.primary.color
        : colors.border.color
      : colors.danger.color
    : colors.danger.color;

  return (
    <View>
      <Controller
        control={control}
        name={'image'}
        render={({ field: { onChange, onBlur } }) => (
          <TouchableOpacity
            onPress={async () => {
              setFocus(true);
              const value = await openImagePicker();
              onChange(value);
            }}
            onBlur={() => onBlur()}
            activeOpacity={0.7}
            style={{ ...insertImageBackgroundStyle, borderColor: selectColor }}
          >
            <Text style={insertImageTextStyle}>Adicionar foto ou vídeo de capa</Text>
            {preview ? (
              <Image source={{ uri: preview }} style={insertImageImageStyle} />
            ) : imageUrl ? (
              <Image source={{ uri: imageUrl }} style={insertImageImageStyle} />
            ) : (
              <></>
            )}
          </TouchableOpacity>
        )}
      />
      <View>
        {errors.image ? (
          <Text style={{ color: selectColor }}>{errors.image.message as string}</Text>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};
