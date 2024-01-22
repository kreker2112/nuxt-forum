import { H3Event } from "h3";
import { createQuestion } from "@/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from "@/server/services/sessionService";

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event);

  const authToken = getCookie(event, "auth_token") as string;
  const user = await getUserBySessionToken(authToken);
  if (!user) {
    throw new Error("User not found");
  }

  const data: IQuestionPost = body.data;

  return await createQuestion(data, user.id);
});
