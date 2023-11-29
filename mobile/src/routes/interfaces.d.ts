import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type AuthRoutesType = {
  SignIn: undefined;
  SignUp: undefined;
  SetAddress: undefined;
};

export type AuthNavigatorRoutesProps = BottomTabNavigationProp<AuthRoutesType>;

type AppRoutesType = {
  Home: undefined;
  Games: undefined;
  Game: undefined;
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
