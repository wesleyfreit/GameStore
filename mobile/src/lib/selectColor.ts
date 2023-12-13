import { colors } from '@/styles/global';

export const selectColor = (type?: string) => {
  switch (type) {
    case 'success':
      return colors.success.color;
    case 'warning':
      return colors.warning.color;
    case 'danger':
      return colors.danger.color;
    case 'disable':
      return colors.sub.color;
    default:
      return colors.primary.color;
  }
};
