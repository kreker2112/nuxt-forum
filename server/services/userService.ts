import { H3Event } from "h3";
import { getUserBySessionToken } from "./sessionService";
import { User } from "@prisma/client";
import { validate } from "./validator";

export async function validateUser(data: RegistrationRequest) {
  const errors = await validate(data);

  if (errors.size > 0) {
    return { hasErrors: true, errors };
  }

  return { hasErrors: false };
}

export function sanitizeUserForFrontend(
  user: IUser | undefined
): User | undefined {
  if (!user) {
    return user;
  }

  delete user.password;
  delete user.loginType;
  delete user.stripeCustomerId;

  return user as User;
}

export async function authCheck(event: H3Event): Promise<boolean> {
  const authToken = getCookie(event, "auth_token");

  const hasAuthToken = typeof authToken === "string";

  if (!hasAuthToken) {
    return false;
  }

  const user = await getUserBySessionToken(authToken);

  if (user?.id) {
    return true;
  }

  return false;
}
