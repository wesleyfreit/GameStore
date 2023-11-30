import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthRoutesType = {
  SignIn: undefined;
  SignUp: undefined;
  SetAddress: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesType>;

type AppRoutesType = {
  Home: undefined;
  Games: undefined;
  Game: RouteProp<ParamListBase>;
  Genres: undefined;
  Users: undefined;
  GameEditor: undefined;
  GenreEditor: undefined;
  Profile: undefined;
  Search: undefined;
  Cart: undefined;
  EditProfile: undefined;
  EditUserAddress: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutesType>;
