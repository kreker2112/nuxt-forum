type ILoginErrors = {
  hasErrors?: string;
};

type LoginResponse = {
  hasErrors: boolean;
  errors?: ILoginErrors;
};

type LoginRequest = {
  usernameOrEmail: string;
  password: string;
};
