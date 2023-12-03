interface SignUpUser {
  repeatPassword?: string;
  username: string;
  email: string;
  password: string;
}

interface SignInUser {
  email: string;
  password: string;
}

interface UserAuth {
  id: string;
  avatar: string;
  username: string;
  isAdmin: boolean;
}
