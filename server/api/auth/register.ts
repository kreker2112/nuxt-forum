import { H3Event } from "h3";
import bcrypt from "bcrypt";

import { validateUser } from "@/server/services/userService";
import { createUser } from "@/server/database/repositories/userRepository";
import { makeSession } from "@/server/services/sessionService";

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const data = body.data as RegistrationRequest;

  const validation: FormValidation = await validateUser(data);

  if (validation.hasErrors === true) {
    const errors: Map<string, { check: InputValidation }> =
      validation.errors || new Map();
    const errorsObj = Object.fromEntries(errors);
    const errorsString = JSON.stringify(errorsObj);
    return sendError(
      event,
      createError({ statusCode: 422, data: errorsString })
    );
  }

  if (data.password === undefined) {
    throw new Error("Password is undefined");
  }

  const encryptedPassword: string = (await bcrypt.hash(
    data.password,
    10
  )) as string;

  const userData: IUser = {
    username: data.username as string,
    name: data.name,
    email: data.email,
    loginType: "email",
    password: encryptedPassword,
  };

  const user = await createUser(userData);

  return await makeSession(user, event);
});
