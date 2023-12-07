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
  Game: { id: string };
  GameEditor: { slug: string } | undefined;
  GenreEditor: { id: string } | undefined;
  EditProfile: undefined;
  EditUserAddress: undefined;
  SetAddress: undefined;
};

type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutesType>;
type MainNavigatorRoutesProps = NativeStackNavigationProp<MainRoutesType>;
