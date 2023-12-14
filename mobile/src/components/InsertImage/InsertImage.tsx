import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import { colors } from '@/styles/global';
import { AppError } from '@/utils/AppError';
import { ImageUri } from '../ImageUri';
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
  setImageType,
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
        const type = result.assets[0].type as string;

        setPreview(image);
        setImageType(type);
        return image;
      }
      setImagErrorMessage({ didCancel: result.didCancel });
    } catch (error) {
      const isAppError = error instanceof AppError;
      if (isAppError) setImagErrorMessage({ errorMessage: error.message });
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
              <ImageUri imageUri={preview} styles={insertImageImageStyle} />
            ) : imageUrl ? (
              <ImageUri imageUri={imageUrl} styles={insertImageImageStyle} />
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
