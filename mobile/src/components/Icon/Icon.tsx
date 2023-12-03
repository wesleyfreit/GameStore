import {
  AlertCircle,
  ArrowLeft,
  ArrowUpNarrowWide,
  Camera,
  Check,
  CheckCircle,
  Gamepad2,
  Home,
  Lock,
  Mail,
  MapPin,
  Search,
  ShoppingCart,
  User,
  Users2,
  XCircle,
} from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

export const Icon = ({ iconName, size, color, strokeWidth }: IconComponentProps) => {
  const iconsArray = [
    { name: 'mail', icon: <Mail size={size} color={color} /> },
    { name: 'password', icon: <Lock size={size} color={color} /> },
    { name: 'point', icon: <MapPin size={size} color={color} /> },
    { name: 'user', icon: <User size={size} color={color} /> },
    { name: 'success', icon: <CheckCircle size={size} color={color} /> },
    { name: 'danger', icon: <XCircle size={size} color={color} /> },
    { name: 'warning', icon: <AlertCircle size={size} color={color} /> },
    { name: 'home', icon: <Home size={size} color={color} /> },
    { name: 'games', icon: <Gamepad2 size={size} color={color} /> },
    { name: 'genres', icon: <ArrowUpNarrowWide size={size} color={color} /> },
    { name: 'users', icon: <Users2 size={size} color={color} /> },
    {
      name: 'cart',
      icon: <ShoppingCart size={size} color={color} strokeWidth={strokeWidth} />,
    },
    { name: 'search', icon: <Search size={size} color={color} /> },
    { name: 'return', icon: <ArrowLeft size={size} color={color} /> },
    {
      name: 'check',
      icon: <Check size={size} color={color} strokeWidth={strokeWidth} />,
    },
    { name: 'camera', icon: <Camera size={size} color={color} /> },
  ];

  const componentIcon = iconsArray.find((component) => component.name === iconName);

  return <View>{componentIcon?.icon}</View>;
};
