import { defineEventHandler, getCookie } from "h3";
import { findQuestion } from "~/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from "~/server/services/sessionService";
import { editQuestion } from "~/server/database/repositories/askJackRespository";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data: IQuestionPost = body.data;

  const questionId = data.id as number;
  // todo: add validation
  const question = await findQuestion(questionId);

  question.description = data.description;
  question.title = data.title;

  const authToken = getCookie(event, "auth_token") as string;
  const user = await getUserBySessionToken(authToken);

  return await editQuestion(question);
});
