interface IUser {
  id?: number;
  username: string | null;
  name?: string | null;
  loginType?: string | null;
  password?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  subscription?: ISubscription | null;
  stripeCustomerId?: string | null;
}
