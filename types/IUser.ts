interface IUser {
  id?: number;
  username: string | null;
  name?: string;
  loginType?: string;
  password?: string;
  email?: string;
  avatarUrl?: string;
  subscription?: ISubscription | null;
  stripeCustomerId?: string | null;
}
