import React from 'react';
import { View } from 'react-native';

import { type ViewAuthComponentProps } from './interfaces';
import { ViewAuthStyles } from './styles';

export const ViewAuth = ({ children }: ViewAuthComponentProps) => (
  <View style={ViewAuthStyles.container}>{children}</View>
);
