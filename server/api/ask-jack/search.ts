import { searchQuestions } from "~/server/database/repositories/askJackRespository";
import { getUserById } from "../../database/repositories/userRepository";

export default eventHandler(async (event) => {
  const queries = getQuery(event);

  const questions = await searchQuestions(queries.search as string);

  const questionsWithAuth = await Promise.all(
    questions.map(async (question) => {
      const user = (await getUserById(question.authorId)) as IUser;
      if (!user) {
        return { ...question, authName: "@Unknown" };
      }
      return { ...question, authName: "@" + user.username };
    })
  );

  return questionsWithAuth;
});
