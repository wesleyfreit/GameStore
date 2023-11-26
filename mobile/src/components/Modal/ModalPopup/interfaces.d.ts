import { type ParamListBase } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ModalPopupComponentProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  navigation?: NativeStackNavigationProp<ParamListBase>;
  iconName: string;
  type: string;
}
