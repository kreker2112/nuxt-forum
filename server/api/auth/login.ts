import { sanitizeUserForFrontend } from "@/server/services/userService";
import { H3Event } from "h3";

import bcrypt from "bcrypt";
import { getUserByEmail } from "@/server/database/repositories/userRepository";
import { makeSession } from "@/server/services/sessionService";

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

// export default eventHandler(async (event: H3Event) => {
//   const body = await readBody(event);
//   const email: string = body.email;
//   const password: string = body.password;
//   const user: any = await getUserByEmail(email);

//   if (!user) {
//     return sendError(
//       event,
//       createError({ statusCode: 401, statusMessage: "Unauthenticated" })
//     );
//   }

//   const isPasswordCorrect = await bcrypt.compare(password, user.password);

//   if (!isPasswordCorrect) {
//     return sendError(
//       event,
//       createError({ statusCode: 401, statusMessage: "Unauthenticated" })
//     );
//   }

//   // Создание сессии теперь происходит только после успешной проверки пароля
//   await makeSession(user, event);

//   return sanitizeUserForFrontend(user);
// });

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const email: string = body.email;
  const password: string = body.password;

  console.log("Email:", email); // Для отладки
  console.log("Password:", password); // Для отладки

  const user: any = await getUserByEmail(email);

  if (!user || !user.password) {
    console.log("Пользователь не найден или у пользователя нет пароля");
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthenticated" })
    );
  }

  console.log("User found:", user); // Для отладки

  try {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      console.log("Неверный пароль");
      return sendError(
        event,
        createError({ statusCode: 401, statusMessage: "Unauthenticated" })
      );
    }

    await makeSession(user, event);

    return sanitizeUserForFrontend(user);
  } catch (error) {
    console.error("Ошибка при сравнении паролей:", error);
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: "Internal Server Error" })
    );
  }
});
