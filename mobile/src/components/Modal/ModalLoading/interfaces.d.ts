interface ModalLoadingComponentProps {
  visible: boolean;
  iconName: keyof IconName;
  title: string;
  buttonTitle: string;
  setVisible: (value: boolean) => void;
  navigateTo?: () => void;
}

type IconName = {
  success: undefined;
  danger: undefined;
  warning: undefined;
};
