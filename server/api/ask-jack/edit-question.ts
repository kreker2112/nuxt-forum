import { defineEventHandler } from "h3";
import { findQuestion } from "@/server/database/repositories/askJackRespository";
// import { getUserBySessionToken } from "@/server/services/sessionService";
import { editQuestion } from "@/server/database/repositories/askJackRespository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data: IQuestionPost = body.data;
  const questionId = data.id;

  if (!questionId) {
    return new Response("Invalid question id", { status: 400 });
  }

  const question = await findQuestion(questionId);

  question.description = data.description;
  question.title = data.title;

  const authToken = getCookie(event, "auth_token");

  if (!authToken) {
    return new Response("Unauthorized", { status: 401 });
  }
  //   const user = await getUserBySessionToken(authToken);

  //   if (!user) {
  //     return new Response("Unauthorized", { status: 401 });
  //   }

  //   const canEdit = user.id === question.authorId || user.isAdmin;

  //   if (!canEdit) {
  //     sendError(
  //       event,
  //       createError({ statusCode: 403, statusMessage: "Unauthorized" })
  //     );
  //   }

  return await editQuestion(question);
});
