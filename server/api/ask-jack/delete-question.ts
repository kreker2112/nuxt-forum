import { defineEventHandler, sendError } from "h3";
import { findQuestion } from "@/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from "@/server/services/sessionService";
import { deleteQuestion } from "@/server/database/repositories/askJackRespository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const question = await findQuestion(parseInt(body.questionId));

  const authToken = getCookie(event, "auth_token");

  if (!authToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await getUserBySessionToken(authToken);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const isMine = user.id == question.authorId;

  if (!isMine) {
    sendError(
      event,
      createError({ statusCode: 403, statusMessage: "Unauthorized" })
    );
  }

  return await deleteQuestion(question.id);
});
