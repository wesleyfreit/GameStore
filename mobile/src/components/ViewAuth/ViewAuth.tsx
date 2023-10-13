import { View } from 'react-native';
import { ViewAuthFunctionProps } from './interfaces';
import { ViewAuthStyles } from './styles';

export const ViewAuth = ({ children }: ViewAuthFunctionProps) => (
  <View style={ViewAuthStyles.container}>{children}</View>
);
