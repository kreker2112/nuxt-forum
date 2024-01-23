import { defineEventHandler } from "h3";
import { createAnswer } from "@/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from "@/server/services/sessionService";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data: IAnswerPost = body.data;

  const authToken = getCookie(event, "auth_token");

  if (!authToken) {
    return new Response("Unauthorized", { status: 401 });
  }
  const user = await getUserBySessionToken(authToken);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  return await createAnswer(data, user.id);
});
