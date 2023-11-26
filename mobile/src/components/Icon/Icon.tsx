import {
  AlertCircle,
  CheckCircle,
  Lock,
  Mail,
  MapPin,
  User,
  XCircle,
} from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

export const Icon = ({ iconName, size, color }: IconComponentProps) => {
  const iconsArray = [
    { name: 'mail', icon: <Mail size={size} color={color} /> },
    { name: 'password', icon: <Lock size={size} color={color} /> },
    { name: 'point', icon: <MapPin size={size} color={color} /> },
    { name: 'user', icon: <User size={size} color={color} /> },
    { name: 'success', icon: <CheckCircle size={size} color={color} /> },
    { name: 'danger', icon: <XCircle size={size} color={color} /> },
    { name: 'warning', icon: <AlertCircle size={size} color={color} /> },
  ];

  const componentIcon = iconsArray.find((component) => component.name === iconName);

  return <View>{componentIcon?.icon}</View>;
};
