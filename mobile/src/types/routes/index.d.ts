import { RouteProp } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthRoutesType = {
  SignIn: undefined;
  SignUp: undefined;
  SetAddress: { coords: string[] } | undefined;
};

type MainRoutesType = {
  Menu: RouteProp | undefined;
  Home: undefined;
  Games: undefined;
  Genres: undefined;
  Users: undefined;
  Profile: undefined;
  Search: undefined;
  Cart: undefined;
  Game: { slug: string; bought?: boolean };
  GameEditor: { slug: string } | undefined;
  GenreEditor: { id: string } | undefined;
  EditProfile: undefined;
  EditUserAddress: undefined;
  SetAddress: { coords: string[] } | undefined;
};

type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesType>;
type MainNavigatorRoutesProps = NativeStackNavigationProp<MainRoutesType>;
