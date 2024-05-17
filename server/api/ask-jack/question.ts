import { defineEventHandler } from "h3";
import { findQuestion } from "~/server/database/repositories/askJackRespository";
import { getUserById } from "../../database/repositories/userRepository";

export default defineEventHandler(async (event) => {
  const queries = getQuery(event);
  const questionId = parseInt(queries.id as string);

  const question = await findQuestion(questionId);

  question.answers.forEach(async (answer: IAnswer) => {
    const user = (await getUserById(answer.authorId)) as IUser;
    answer.authorName = "@" + user.username;
  });

  const user = (await getUserById(question.authorId)) as IUser;
  question.authName = "@" + user.username;

  return question;
});
