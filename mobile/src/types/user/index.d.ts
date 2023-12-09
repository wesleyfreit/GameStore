interface SignUpUser {
  repeatPassword?: string;
  username: string;
  email: string;
  password: string;
  address: string;
  point?: string[];
}

interface SignInUser {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  avatar?: string;
  username: string;
  isAdmin: boolean;
  email?: string;
  address?: string;
  point?: string[];
}
