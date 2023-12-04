import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthRoutesType = {
  SignIn: undefined;
  SignUp: undefined;
  SetAddress: undefined;
};

type MainRoutesType = {
  Menu: undefined;
  Home: undefined;
  Games: undefined;
  Genres: undefined;
  Users: undefined;
  Profile: undefined;
  Search: undefined;
  Cart: undefined;
  Game: RouteProp;
  GameEditor: RouteProp;
  GenreEditor: RouteProp;
  EditProfile: undefined;
  EditUserAddress: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesType>;
export type MainNavigatorRoutesProps = NativeStackNavigationProp<MainRoutesType>;
