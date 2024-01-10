import { sanitizeUserForFrontend } from "@/server/services/userService";

import bcrypt from "bcrypt";
import { getUserByEmail } from "@/server/database/repositories/userRepository";
import { makeSession } from "@/server/services/sessionService";

export default async (event: any) => {
  const body = await readBody(event);
  const email: string = body.email;
  const password: string = body.password;
  const user: any = await getUserByEmail(email);

  if (user === null) {
    sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthenticated" })
    );
  }

  const isPasswordCorrect = bcrypt.compare(password, user.password as string);

  if (!isPasswordCorrect) {
    sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthenticated" })
    );
  }

  await makeSession(user, event);

  return sanitizeUserForFrontend(user);
};

// export default eventHandler(async (event: H3Event) => {
//   const body = await readBody(event);
//   const email: string = body.email;
//   const password: string = body.password;
//   const user: any = await getUserByEmail(email);

//   if (user === null) {
//     sendError(
//       event,
//       createError({ statusCode: 401, statusMessage: "Unauthenticated" })
//     );
//   }

//   const isPasswordCorrect = bcrypt.compare(password, user.password as string);

//   if (!isPasswordCorrect) {
//     sendError(
//       event,
//       createError({ statusCode: 401, statusMessage: "Unauthenticated" })
//     );
//   }

//   await makeSession(user, event);

//   return sanitizeUserForFrontend(user);
// });
