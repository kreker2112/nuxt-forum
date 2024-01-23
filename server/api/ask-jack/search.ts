import { H3Event, defineEventHandler } from "h3";
import { searchQuestions } from "@/server/database/repositories/askJackRespository";

export default defineEventHandler(async (event: H3Event) => {
  const queries = getQuery(event);

  return await searchQuestions(queries.search as string);
});
