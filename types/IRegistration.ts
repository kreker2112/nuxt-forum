type IRegistrationErrors = {
  hasErrors?: string;
};

type RegistrationResponse = {
  hasErrors: boolean;
  errors?: IRegistrationErrors;
};

type RegistrationRequest = {
  name: string;
  username?: string;
  email?: string;
  password?: string;
};
