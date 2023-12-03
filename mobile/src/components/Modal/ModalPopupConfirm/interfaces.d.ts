interface ModalPopupConfirmComponentProps {
  visible: boolean;
  iconName: keyof IconName;
  title: string;
  setVisible: (value: boolean) => void;
  isTrue: () => void;
}

type IconName = {
  success: undefined;
  danger: undefined;
  warning: undefined;
};
