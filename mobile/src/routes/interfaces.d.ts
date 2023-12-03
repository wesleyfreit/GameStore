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
  Game: RouteProp;
  Genres: undefined;
  Users: undefined;
  GameEditor: RouteProp;
  GenreEditor: RouteProp;
  Profile: undefined;
  Search: undefined;
  Cart: undefined;
  EditProfile: undefined;
  EditUserAddress: undefined;
};

export type HomeNavigatorRoutesProps = NativeStackNavigationProp<AppRoutesType>;

type RoutesType = {
  Stack: RouteProp;
  Tab: RouteProp;
};

export type NavigatorRoutesProps = NativeStackNavigationProp<RoutesType>;
