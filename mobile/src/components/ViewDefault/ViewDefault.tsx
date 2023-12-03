import React from 'react';
import { View } from 'react-native';

import { type ViewAuthComponentProps } from './interfaces';
import { ViewAuthContainerStyle } from './styles';

export const ViewDefault = ({ children }: ViewAuthComponentProps) => (
  <View style={ViewAuthContainerStyle}>{children}</View>
);
